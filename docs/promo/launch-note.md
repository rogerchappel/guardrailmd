# Launch Note Draft

GuardrailMD is a local-first Markdown safety lint for agent runbooks and operational docs.

It scans Markdown before a human, CI job, or coding agent acts on instructions that may include destructive shell commands, secret-looking literals, external writes, or risky prose with no nearby safeguard language.

## What to show

- `examples/risky-runbook.md` as the intentionally unsafe input.
- `examples/runbooks/cache-purge-reviewed.md` as the contrast case with review language.
- `bash demo/ci-preflight.sh` to create human and SARIF reports in a temporary directory.
- `guardrailmd init --write-config` for teams that want a checked-in starting config.

## Positioning

Use GuardrailMD as a preflight reviewer for docs that become automation context. It does not execute commands, call remote services, or mutate the scanned files.

## Honest limits

GuardrailMD is a deterministic lint tool for common risky Markdown patterns. It does not prove a runbook is safe, replace a human reviewer, or understand every possible shell program.
