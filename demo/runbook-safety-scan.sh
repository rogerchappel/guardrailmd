#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

npm run build

report_dir="${TMPDIR:-/tmp}/guardrailmd-demo"
mkdir -p "$report_dir"

set +e
node dist/cli.js scan examples/risky-runbook.md --format human > "$report_dir/risky-runbook.txt"
human_status=$?
node dist/cli.js scan examples/risky-runbook.md --format json > "$report_dir/risky-runbook.json"
json_status=$?
set -e

if [ "$human_status" -ne 1 ] && [ "$human_status" -ne 0 ]; then
  echo "human scan failed unexpectedly with exit code $human_status" >&2
  exit "$human_status"
fi

if [ "$json_status" -ne 1 ] && [ "$json_status" -ne 0 ]; then
  echo "json scan failed unexpectedly with exit code $json_status" >&2
  exit "$json_status"
fi

grep -Eq "rm -rf|curl|secret|critical|high" "$report_dir/risky-runbook.txt"
grep -Eq '"findings"|"severity"|"ruleId"' "$report_dir/risky-runbook.json"

echo "GuardrailMD demo reports written to $report_dir"
