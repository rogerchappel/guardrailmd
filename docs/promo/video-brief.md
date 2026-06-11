# Video Brief: Agent Runbook Safety Review

## Hook

Show `guardrailmd` catching risky Markdown instructions before a human or coding agent follows them.

## Demo Beat Sheet

1. Build with `npm run build`.
2. Open `examples/risky-runbook.md` and show that it contains an installer pipe, `rm -rf`, and destructive prose.
3. Run `bash examples/agent-runbook-review.sh`.
4. Show the human report for local review.
5. Show the JSON report as the automation-friendly shape.

## Claims to Keep Grounded

- GuardrailMD scans local Markdown files.
- It does not execute runbook commands.
- Human, JSON, and SARIF reports are supported by the CLI.
- Allowlist comments can document intentional risky examples.

## Avoid Saying

- Do not claim that GuardrailMD proves a runbook is safe.
- Do not imply it replaces security review or production approval.

## Verification to Mention

```sh
npm run build
bash examples/agent-runbook-review.sh
```

