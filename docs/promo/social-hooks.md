# GuardrailMD Social Hooks

Grounded source: `README.md`, `examples/risky-runbook.md`, `demo/runbook-safety-scan.sh`, and `docs/SAFETY.md`.

## Short posts

1. Agent runbooks deserve the same review pressure as code. GuardrailMD scans Markdown for risky shell, secret-looking values, webhook/API writes, and missing safety language before anyone follows the instructions.

2. New demo: run `bash demo/runbook-safety-scan.sh` in GuardrailMD to generate human and JSON reports from an intentionally risky runbook fixture. Local-only, deterministic, and safe to inspect.

3. If your agent workflow starts with a Markdown checklist, GuardrailMD can make the risky parts visible: destructive commands, secret-looking literals, external write patterns, and missing rollback/approval context.

## Video angle

Show a risky runbook on the left, run the demo script, then open the human report and JSON report. The practical takeaway: reviewers can catch dangerous instructions before they become agent actions.
