# Safety Model

GuardrailMD is a warning light for Markdown that will be read by humans, agents, or CI.

## What it does

- Scans local Markdown files and directories.
- Emits deterministic findings with file, line, column, severity, and remediation.
- Redacts common secret-shaped literals in rendered excerpts.
- Fails CI according to `--fail-on`.

## What it does not do

- It does not execute commands found in Markdown.
- It does not send findings to a server.
- It does not rotate secrets for you.
- It does not prove a runbook is safe; it highlights patterns worth review.

## Allowlist expectations

Use `<!-- guardrailmd-ignore: reason -->` sparingly. The reason should explain why the risky instruction is intentional and how a reviewer can verify the boundary.
