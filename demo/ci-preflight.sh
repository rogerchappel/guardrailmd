#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${TMPDIR:-/tmp}/guardrailmd-ci-preflight"
HUMAN_REPORT="$OUT_DIR/risky-runbook.txt"
SARIF_REPORT="$OUT_DIR/risky-runbook.sarif"

mkdir -p "$OUT_DIR"
cd "$ROOT_DIR"

npm run build

set +e
node dist/cli.js scan examples/risky-runbook.md --format human >"$HUMAN_REPORT"
human_status=$?
node dist/cli.js scan examples/risky-runbook.md --format sarif --output "$SARIF_REPORT"
sarif_status=$?
set -e

test -s "$HUMAN_REPORT"
test -s "$SARIF_REPORT"
grep -q "rm -rf" "$HUMAN_REPORT"
grep -q '"version"' "$SARIF_REPORT"

echo "Human report: $HUMAN_REPORT"
echo "SARIF report: $SARIF_REPORT"
echo "Expected human scan exit: $human_status"
echo "Expected SARIF scan exit: $sarif_status"
