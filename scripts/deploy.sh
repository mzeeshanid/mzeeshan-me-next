#!/usr/bin/env bash
# Zero-downtime deployment script.
#
# Strategy: build in an isolated release directory; only update the live
# `current` symlink after a successful build; PM2 cluster mode performs a
# rolling reload so at least one worker is always alive.
#
# Required env vars (passed from GitHub Actions):
#   APP_DIR       – root deployment directory on the server
#   BRANCH        – git branch to deploy (default: main)
#   PM2_APP_NAME  – PM2 app name (default: mzeeshanme)

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
APP_DIR="${APP_DIR:?APP_DIR is required}"
BRANCH="${BRANCH:-main}"
PM2_APP_NAME="${PM2_APP_NAME:-mzeeshanme}"
GITHUB_DEPLOY_KEY_PATH="${GITHUB_DEPLOY_KEY_PATH:-/root/.ssh/id_rsa_github_mzeeshan_me_next_deploy}"
NVM_DIR="${NVM_DIR:-/root/.nvm}"
NODE_VERSION="${NODE_VERSION:-22.14.0}"
YARN_CACHE_FOLDER="${YARN_CACHE_FOLDER:-/tmp/mzeeshan-me-next-yarn-cache}"
NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=2048}"
PORT="${PORT:-3000}"
KEEP_RELEASES="${KEEP_RELEASES:-3}"

RELEASES_DIR="$APP_DIR/releases"
SHARED_DIR="$APP_DIR/shared"
REPO_DIR="$APP_DIR/repo"
CURRENT_LINK="$APP_DIR/current"
RELEASE_NAME="$(date +%Y%m%d_%H%M%S)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_NAME"

export NODE_OPTIONS
export YARN_CACHE_FOLDER

# ── Node / nvm ────────────────────────────────────────────────────────────────
export NVM_DIR
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  nvm use "$NODE_VERSION"
else
  echo "nvm not found at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

node -v
yarn -v

# ── SSH / git auth ────────────────────────────────────────────────────────────
eval "$(ssh-agent -s)"
trap 'ssh-agent -k >/dev/null 2>&1 || true' EXIT

ssh-add "$GITHUB_DEPLOY_KEY_PATH"
export GIT_SSH_COMMAND="ssh -i $GITHUB_DEPLOY_KEY_PATH -o IdentitiesOnly=yes"

# ── Preflight checks ──────────────────────────────────────────────────────────
if [ ! -L "$CURRENT_LINK" ]; then
  echo "Error: $CURRENT_LINK symlink not found." >&2
  echo "Run scripts/setup-server.sh first to migrate the server." >&2
  exit 1
fi

if [ ! -f "$SHARED_DIR/.env" ]; then
  echo "Error: $SHARED_DIR/.env not found." >&2
  exit 1
fi

mkdir -p "$RELEASES_DIR" "$YARN_CACHE_FOLDER"

# ── Rollback helper ───────────────────────────────────────────────────────────
rollback() {
  echo "==> Rolling back..."
  PREV=$(ls -dt "$RELEASES_DIR"/[0-9]* 2>/dev/null | sed -n '2p' || true)
  if [ -n "$PREV" ]; then
    ln -sfn "$PREV" "$CURRENT_LINK"
    echo "  Reverted current -> $PREV"
    pm2 reload "$PM2_APP_NAME" --update-env || true
  else
    echo "  No previous release found to roll back to."
  fi
  pm2 logs "$PM2_APP_NAME" --lines 50 --nostream || true
}

# ── 1. Fetch latest code into repo/ ──────────────────────────────────────────
echo "==> Fetching $BRANCH"
cd "$REPO_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

# ── 2. Create isolated release directory ─────────────────────────────────────
echo "==> Creating release $RELEASE_NAME"
mkdir -p "$RELEASE_DIR"

# Export a clean snapshot of HEAD (no .git directory)
git archive HEAD | tar -x -C "$RELEASE_DIR"

# Symlink the shared .env
ln -sf "$SHARED_DIR/.env" "$RELEASE_DIR/.env"

# ── 3. Install dependencies ───────────────────────────────────────────────────
echo "==> Installing dependencies"
cd "$RELEASE_DIR"
yarn install --frozen-lockfile
npm rebuild sharp 2>/dev/null || true

# ── 4. Build (live site untouched until this succeeds) ────────────────────────
echo "==> Building"
# Load env vars so next build picks up NEXT_PUBLIC_* variables
set -a
. "$SHARED_DIR/.env"
set +a

yarn build
# postbuild (next-sitemap) runs automatically via package.json postbuild hook

echo "==> Build succeeded"

# ── 5. Atomic symlink swap ────────────────────────────────────────────────────
echo "==> Activating release"
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"
echo "  current -> $RELEASE_DIR"

# ── 6. Generate ecosystem file with correct cwd ───────────────────────────────
cat > "$APP_DIR/ecosystem.deploy.js" << ECOSYSTEM
module.exports = {
  apps: [{
    name: "$PM2_APP_NAME",
    script: "node_modules/.bin/next",
    args: "start",
    cwd: "$CURRENT_LINK",
    instances: 2,
    exec_mode: "cluster",
    max_memory_restart: "512M",
    env_production: {
      NODE_ENV: "production",
      PORT: $PORT
    }
  }]
};
ECOSYSTEM

# ── 7. Reload PM2 (rolling — no downtime) ────────────────────────────────────
echo "==> Reloading PM2"
if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
  if ! pm2 startOrReload "$APP_DIR/ecosystem.deploy.js" --env production --update-env; then
    rollback
    exit 1
  fi
else
  if ! pm2 start "$APP_DIR/ecosystem.deploy.js" --env production; then
    rollback
    exit 1
  fi
fi

# ── 8. Health check ──────────────────────────────────────────────────────────
echo "==> Running health check"
HEALTH_URL="http://localhost:$PORT/"
HEALTHY=false

for i in 1 2 3 4 5; do
  sleep 3
  HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$HEALTH_URL" || echo "000")
  echo "  Attempt $i: HTTP $HTTP_STATUS"
  if [ "$HTTP_STATUS" = "200" ]; then
    HEALTHY=true
    break
  fi
done

if [ "$HEALTHY" != "true" ]; then
  echo "Error: Health check failed after 5 attempts." >&2
  rollback
  exit 1
fi

echo "==> Health check passed"

# ── 9. Cleanup old releases ───────────────────────────────────────────────────
echo "==> Cleaning up old releases (keeping last $KEEP_RELEASES)"
ls -dt "$RELEASES_DIR"/[0-9]* 2>/dev/null | tail -n "+$((KEEP_RELEASES + 1))" | while read -r OLD; do
  echo "  Removing $OLD"
  rm -rf "$OLD"
done

pm2 save
echo "==> Deploy complete: $RELEASE_NAME is live"
