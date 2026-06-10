#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "== Human report for an intentionally risky runbook =="
node "$ROOT_DIR/dist/cli.js" scan "$ROOT_DIR/examples/risky-runbook.md" --format human || true

echo
echo "== JSON report for automation =="
node "$ROOT_DIR/dist/cli.js" scan "$ROOT_DIR/examples/risky-runbook.md" --format json || true

