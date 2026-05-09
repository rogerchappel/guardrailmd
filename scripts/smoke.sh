#!/usr/bin/env bash
set -euo pipefail

node dist/cli.js --help >/dev/null
node dist/cli.js scan tests/fixtures/safe-runbook.md --fail-on low >/dev/null

set +e
output="$(node dist/cli.js scan tests/fixtures/risky-runbook.md --format json --fail-on critical 2>&1)"
status=$?
set -e

if [ "$status" -ne 1 ]; then
  printf 'expected risky fixture to exit 1, got %s\n%s\n' "$status" "$output" >&2
  exit 1
fi

printf '%s\n' "$output" | grep 'GMD002' >/dev/null
printf 'GuardrailMD smoke passed.\n'
