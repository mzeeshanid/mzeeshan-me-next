#!/usr/bin/env bash
# Run ONCE on the server to migrate from the flat layout to the release-based layout.
# The running PM2 app is replaced gracefully — brief PM2 restart is acceptable here
# because this script is only ever run once as a migration step.
#
# Usage:
#   APP_DIR=/path/to/app PM2_APP_NAME=mzeeshanme bash scripts/setup-server.sh

set -euo pipefail

APP_DIR="${APP_DIR:?APP_DIR is required}"
PM2_APP_NAME="${PM2_APP_NAME:-mzeeshanme}"
NVM_DIR="${NVM_DIR:-/root/.nvm}"
NODE_VERSION="${NODE_VERSION:-22.14.0}"
PORT="${PORT:-3000}"
GITHUB_DEPLOY_KEY_PATH="${GITHUB_DEPLOY_KEY_PATH:-/root/.ssh/id_rsa_github_mzeeshan_me_next_deploy}"

export NVM_DIR
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  nvm use "$NODE_VERSION"
else
  echo "nvm not found at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

echo "==> Migrating $APP_DIR to release-based layout"

RELEASES_DIR="$APP_DIR/releases"
SHARED_DIR="$APP_DIR/shared"
REPO_DIR="$APP_DIR/repo"
CURRENT_LINK="$APP_DIR/current"
INITIAL_RELEASE="$RELEASES_DIR/initial"

# ── 1. Guard: abort if already migrated ───────────────────────────────────────
if [ -L "$CURRENT_LINK" ]; then
  echo "Error: $CURRENT_LINK symlink already exists — looks like migration already ran." >&2
  exit 1
fi

# ── 2. Create directory structure ─────────────────────────────────────────────
mkdir -p "$RELEASES_DIR" "$SHARED_DIR" "$REPO_DIR"
echo "  Created releases/, shared/, repo/"

# ── 3. Move .env to shared/ ───────────────────────────────────────────────────
ENV_SRC="$APP_DIR/.env"
if [ ! -f "$ENV_SRC" ]; then
  echo "Error: $ENV_SRC not found. Create it before running this script." >&2
  exit 1
fi
cp "$ENV_SRC" "$SHARED_DIR/.env"
echo "  Copied .env to shared/.env"

# ── 4. Clone a working git repo into repo/ ────────────────────────────────────
eval "$(ssh-agent -s)"
trap 'ssh-agent -k >/dev/null 2>&1 || true' EXIT
ssh-add "$GITHUB_DEPLOY_KEY_PATH"
export GIT_SSH_COMMAND="ssh -i $GITHUB_DEPLOY_KEY_PATH -o IdentitiesOnly=yes"

git clone --local "$APP_DIR" "$REPO_DIR"
# Point the clone at the real remote so future fetches work
cd "$REPO_DIR"
git remote set-url origin "$(git -C "$APP_DIR" remote get-url origin)"
echo "  Cloned repo into repo/"

# ── 5. Copy current app state into releases/initial ───────────────────────────
mkdir -p "$INITIAL_RELEASE"
# rsync everything except the dirs we just created and the .git folder
rsync -a "$APP_DIR/" "$INITIAL_RELEASE/" \
  --exclude=releases \
  --exclude=shared \
  --exclude=repo \
  --exclude=.git
echo "  Copied current app into releases/initial/"

# Symlink the shared .env into the initial release
rm -f "$INITIAL_RELEASE/.env"
ln -sf "$SHARED_DIR/.env" "$INITIAL_RELEASE/.env"

# ── 6. Create current symlink ─────────────────────────────────────────────────
ln -sfn "$INITIAL_RELEASE" "$CURRENT_LINK"
echo "  Created current -> releases/initial"

# ── 7. Generate ecosystem.deploy.js ──────────────────────────────────────────
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
echo "  Generated ecosystem.deploy.js"

# ── 8. Restart PM2 with new config ────────────────────────────────────────────
if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
  pm2 delete "$PM2_APP_NAME"
fi

pm2 start "$APP_DIR/ecosystem.deploy.js" --env production
pm2 save
echo "  PM2 restarted with cluster mode (2 instances)"

echo ""
echo "==> Migration complete."
echo "    App serving from: $CURRENT_LINK"
echo "    Run 'pm2 list' to verify both instances are online."
echo "    Future deploys will use scripts/deploy.sh as normal."
