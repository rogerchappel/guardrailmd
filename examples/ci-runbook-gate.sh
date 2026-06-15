#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${TMPDIR:-/tmp}/guardrailmd-ci-runbook-gate"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

echo "== Scan the intentionally unsafe runbook and capture JSON evidence =="
if node "$ROOT_DIR/dist/cli.js" scan \
  "$ROOT_DIR/examples/runbooks/cache-purge-unsafe.md" \
  --format json \
  --output "$OUT_DIR/unsafe.json"; then
  echo "Unexpected pass for unsafe runbook"
  exit 1
else
  echo "Unsafe runbook failed as expected"
fi

echo
echo "== Scan the reviewed runbook as the critical-threshold gate =="
node "$ROOT_DIR/dist/cli.js" scan \
  "$ROOT_DIR/examples/runbooks/cache-purge-reviewed.md" \
  --format human \
  --fail-on critical

echo
echo "JSON evidence written to $OUT_DIR/unsafe.json"
