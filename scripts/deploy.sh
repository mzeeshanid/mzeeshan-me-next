#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:?APP_DIR is required}"
BRANCH="${BRANCH:-main}"
PM2_APP_NAME="${PM2_APP_NAME:-mzeeshanme}"
GITHUB_DEPLOY_KEY_PATH="${GITHUB_DEPLOY_KEY_PATH:-/root/.ssh/id_rsa_github_mzeeshan_me_next_deploy}"
NVM_DIR="${NVM_DIR:-/root/.nvm}"
NODE_VERSION="${NODE_VERSION:-22.14.0}"
YARN_CACHE_FOLDER="${YARN_CACHE_FOLDER:-/tmp/mzeeshan-me-next-yarn-cache}"
NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=2048}"
ENV_FILE="${ENV_FILE:-.env}"

cd "$APP_DIR"

export NVM_DIR
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # GitHub Actions SSH sessions are non-interactive, so load nvm manually.
  . "$NVM_DIR/nvm.sh"
  nvm use "$NODE_VERSION"
else
  echo "nvm not found at $NVM_DIR/nvm.sh" >&2
  exit 1
fi

export NODE_OPTIONS
export YARN_CACHE_FOLDER

node -v
yarn -v

eval "$(ssh-agent -s)"
trap 'ssh-agent -k >/dev/null 2>&1 || true' EXIT

ssh-add "$GITHUB_DEPLOY_KEY_PATH"
export GIT_SSH_COMMAND="ssh -i $GITHUB_DEPLOY_KEY_PATH -o IdentitiesOnly=yes"

git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

mkdir -p "$YARN_CACHE_FOLDER"
yarn install --frozen-lockfile

if [ ! -f "$ENV_FILE" ]; then
  echo "Environment file not found: $ENV_FILE" >&2
  exit 1
fi

set -a
. "$ENV_FILE"
set +a

yarn build

if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
  if ! pm2 reload "$PM2_APP_NAME" --update-env; then
    pm2 logs "$PM2_APP_NAME" --lines 100 --nostream || true
    exit 1
  fi
else
  if ! pm2 start ecosystem.config.js --only "$PM2_APP_NAME" --env production; then
    pm2 logs "$PM2_APP_NAME" --lines 100 --nostream || true
    exit 1
  fi
fi

pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1 || {
  pm2 logs "$PM2_APP_NAME" --lines 100 --nostream || true
  exit 1
}

pm2 save
