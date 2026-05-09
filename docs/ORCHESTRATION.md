# GuardrailMD Orchestration

GuardrailMD is intentionally local-first. Agents and CI should run it before using Markdown runbooks as instructions.

## Recommended agent flow

1. Run `guardrailmd scan <runbook-or-docs> --format human` before executing an unfamiliar runbook.
2. If findings are high or critical, pause and ask a human for review unless the line is intentionally allowlisted.
3. Prefer `--format json` for agent-readable planning and `--format sarif` for code scanning upload.
4. Never pipe GuardrailMD findings into an automatic fixer that mutates production instructions without review.

## CI flow

```sh
npm run build
guardrailmd scan README.md docs examples --fail-on high
```

For GitHub code scanning:

```sh
guardrailmd scan . --format sarif --output guardrailmd.sarif --fail-on critical
```

## Safety boundaries

- The CLI reads local Markdown and optional local JSON config only.
- No telemetry, network calls, secret uploads, or external mutation.
- Findings redact known secret-shaped values before rendering.
- Allowlists are explicit comments and should include a human-readable reason.
