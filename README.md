# GuardrailMD 🛡️📝

Markdown safety lint for agent runbooks.

GuardrailMD is the little reviewer who taps the glass before an agent follows a runbook that says “just delete the bucket” or pastes a token into a code block. It is local-first, deterministic, and built for teams who want Markdown instructions to be safer before humans, CI, or coding agents act on them.

## Install

```sh
npm install -g guardrailmd
```

For local development from this repository:

```sh
npm install
npm run build
node dist/cli.js --help
```

## Use

```sh
guardrailmd scan README.md docs/
guardrailmd scan . --format json
guardrailmd scan . --format sarif --output guardrailmd.sarif
guardrailmd scan . --fail-on critical
guardrailmd init --write-config
```

## What it catches

- Risky shell patterns such as `rm -rf`, `curl | sh`, `terraform destroy`, and force pushes.
- Secret-looking literals such as GitHub tokens, Slack tokens, AWS keys, and generic API key assignments.
- Likely external writes to common API/webhook hosts.
- Destructive prose that lacks nearby confirmation, backup, dry-run, approval, or rollback language.

## Allow intentional patterns

Put the allowlist comment on the same line or directly above the intentional pattern:

```md
<!-- guardrailmd-ignore: documented recovery drill in a throwaway sandbox -->
rm -rf ./tmp/fire-drill
```

## Reports

Human output is friendly for local review. JSON is stable for agents. SARIF can be uploaded to code scanning.

```sh
guardrailmd scan examples --format human
guardrailmd scan examples --format json
guardrailmd scan examples --format sarif --output guardrailmd.sarif
```

## Runnable demo

Review the intentionally risky example runbook in both human and JSON formats:

```sh
npm run build
bash examples/agent-runbook-review.sh
```

The demo keeps scanning local files only and ignores the non-zero finding exit so both report formats are visible in one run.

## Config

Generate defaults:

```sh
guardrailmd init --write-config
```

GuardrailMD reads `guardrailmd.config.json` from the current directory, or a custom path with `--config`.

## Verify

```sh
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```

## Safety and privacy

GuardrailMD reads local Markdown and optional local JSON config. It does not execute runbook commands, phone home, collect telemetry, or mutate external services. See [docs/SAFETY.md](docs/SAFETY.md) and [SECURITY.md](SECURITY.md).

## Project docs

- [PRD](docs/PRD.md)
- [Tasks](docs/TASKS.md)
- [Orchestration](docs/ORCHESTRATION.md)
- [Machine-readable orchestration](docs/orchestration.json)

## License

MIT
