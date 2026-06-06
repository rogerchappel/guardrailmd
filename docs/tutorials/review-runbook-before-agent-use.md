# Review A Runbook Before Agent Use

This recipe shows how GuardrailMD can review Markdown runbooks before a human, CI job, or coding agent follows the instructions.

## Files

- `examples/runbooks/cache-purge-unsafe.md`: intentionally unsafe commands and prose.
- `examples/runbooks/cache-purge-reviewed.md`: a safer staging-cache version with preconditions, dry-run, bounded delete, and rollback language.

## Run the demo

```bash
npm run build
node dist/cli.js scan examples/runbooks/cache-purge-unsafe.md --format human
node dist/cli.js scan examples/runbooks/cache-purge-reviewed.md --format human
node dist/cli.js scan examples/runbooks/cache-purge-unsafe.md --format sarif --output guardrailmd-demo.sarif
```

## What to look for

The unsafe runbook should surface concrete findings for risky shell patterns and destructive instructions. The reviewed runbook demonstrates the kind of context GuardrailMD looks for near risky operations: confirmation, dry-run, bounded scope, and rollback language.

GuardrailMD is a local Markdown scanner. It reads files, renders human, JSON, or SARIF reports, and does not execute the runbook commands.

## PR appendix template

```md
GuardrailMD was run against the runbook before agent use.

Commands:

`node dist/cli.js scan examples/runbooks/cache-purge-unsafe.md --format human`
`node dist/cli.js scan examples/runbooks/cache-purge-reviewed.md --format human`

Any remaining findings should be either fixed or documented with a narrow allowlist comment.
```
