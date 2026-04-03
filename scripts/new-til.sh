#!/bin/sh
set -e

OFFSET=${1:-0}
if date -v+0d +%Y-%m-%d >/dev/null 2>&1; then
  DATE=$(date -v+${OFFSET}d +%Y-%m-%d)
else
  DATE=$(date -d "${OFFSET} days" +%Y-%m-%d)
fi
FILE="src/content/til/${DATE}.md"

if [ -f "$FILE" ]; then
  echo "TIL for ${DATE} already exists: ${FILE}"
else
  touch "$FILE"
  echo "Created ${FILE}"
fi
