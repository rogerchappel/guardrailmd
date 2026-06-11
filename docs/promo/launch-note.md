# Launch Note Draft

`guardrailmd` is a local-first Markdown safety linter for runbooks that humans, CI, or coding agents may follow.

The current demo scans an intentionally risky runbook and shows both human-readable and JSON reports for risky shell commands and destructive prose that lacks confirmation context.

## What to Show

- `npm run build`
- `bash examples/agent-runbook-review.sh`
- The high-severity shell findings.
- The JSON report shape for automation.

## Limits

- GuardrailMD reports suspicious Markdown patterns.
- It does not execute runbook commands.
- It does not prove a runbook is safe or replace security review.

