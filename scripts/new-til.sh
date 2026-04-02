#!/bin/sh
set -e

OFFSET=${1:-0}
DATE=$(date -v${OFFSET}d +%Y-%m-%d 2>/dev/null || date -d "${OFFSET} days" +%Y-%m-%d)
FILE="src/content/til/${DATE}.md"

if [ -f "$FILE" ]; then
  echo "TIL for ${DATE} already exists: ${FILE}"
else
  touch "$FILE"
  echo "Created ${FILE}"
fi
