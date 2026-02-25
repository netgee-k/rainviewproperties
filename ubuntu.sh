#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${1:-$PWD}"
PHP_INI="${PHP_INI:-/home/$USER/.config/herd-lite/bin/php.ini}"

cd "$PROJECT_DIR"

echo "==> Using PHP: $(command -v php)"
php -v | head -n 2 || true
echo "==> PHP ini: $PHP_INI"

echo "==> Installing build deps (Ubuntu/Debian)..."
sudo apt update
sudo apt install -y php-dev php-pear build-essential pkg-config libssl-dev

echo "==> Ensuring pecl exists..."
command -v pecl >/dev/null 2>&1 || { echo "ERROR: pecl not found after install"; exit 1; }

echo "==> Removing old mongodb extension (if any)..."
sudo pecl uninstall mongodb >/dev/null 2>&1 || true

echo "==> Installing mongodb extension (>=1.21)..."
printf "\n" | sudo pecl install mongodb-1.21.2

echo "==> Enabling extension in Herd Lite php.ini..."
if [ ! -f "$PHP_INI" ]; then
  echo "ERROR: php.ini not found at $PHP_INI"
  echo "Run: php --ini  (and set PHP_INI env var to the Loaded Configuration File path)"
  exit 1
fi

if ! grep -qiE '^\s*extension\s*=\s*mongodb' "$PHP_INI"; then
  echo "extension=mongodb" | sudo tee -a "$PHP_INI" >/dev/null
fi

echo "==> Verifying mongodb extension..."
php --ri mongodb | head -n 25

echo "==> Installing Laravel MongoDB driver..."
composer require mongodb/laravel-mongodb:^5.6

echo "==> Updating .env (MongoDB as primary)..."
ENV_FILE=".env"
touch "$ENV_FILE"

set_kv () {
  local key="$1" val="$2"
  if grep -qE "^${key}=" "$ENV_FILE"; then
    sed -i "s|^${key}=.*|${key}=${val}|" "$ENV_FILE"
  else
    echo "${key}=${val}" >> "$ENV_FILE"
  fi
}

set_kv "DB_CONNECTION" "mongodb"
set_kv "MONGODB_DSN" "\"mongodb+srv://wamithidan222_db_user:VNTXorAwUptWwgNV@rainaview.5ln6kyy.mongodb.net/?retryWrites=true&w=majority&appName=RainviewProperties\""
set_kv "MONGODB_DATABASE" "rainviewproprties"

set_kv "SESSION_DRIVER" "file"
set_kv "QUEUE_CONNECTION" "sync"
set_kv "CACHE_STORE" "file"

echo "==> Clearing Laravel caches..."
php artisan optimize:clear || true

echo "==> Done. Start server with: php artisan serve"
