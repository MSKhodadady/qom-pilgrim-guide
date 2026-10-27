#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  printf 'Error: .env file not found at %s\n' "$ENV_FILE" >&2
  exit 1
fi

# Load the backend environment using the shell's dotenv-compatible syntax.
# shellcheck disable=SC1090
source "$ENV_FILE"

if [[ -z "${ADMIN_SECRET_KEY:-}" ]]; then
  printf 'Error: ADMIN_SECRET_KEY is empty or missing in %s\n' "$ENV_FILE" >&2
  exit 1
fi

if [[ -z "${APP_URL:-}" ]]; then
  printf 'Error: APP_URL is empty or missing in %s\n' "$ENV_FILE" >&2
  exit 1
fi

for command in curl php; do
  if ! command -v "$command" >/dev/null 2>&1; then
    printf 'Error: required command not found: %s\n' "$command" >&2
    exit 1
  fi
done

read -r -p 'Username: ' username
read -r -s -p 'Password: ' password
printf '\n'
read -r -s -p 'Confirm password: ' password_confirmation
printf '\n'

if [[ -z "$username" || -z "$password" ]]; then
  printf 'Error: username and password must not be empty.\n' >&2
  exit 1
fi

if [[ "$password" != "$password_confirmation" ]]; then
  printf 'Error: passwords do not match.\n' >&2
  exit 1
fi

payload="$(printf '%s\0' "$username" "$password" "$password_confirmation" "$ADMIN_SECRET_KEY" | php -r '
$values = explode("\0", stream_get_contents(STDIN));
echo json_encode([
    "username" => $values[0],
    "password" => $values[1],
    "password_confirmation" => $values[2],
    "secret_key" => $values[3],
], JSON_THROW_ON_ERROR);
')"

url="${APP_URL%/}/api/auth/register"
curl --fail-with-body --silent --show-error \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --request POST \
  --data "$payload" \
  "$url"
printf '\n'
