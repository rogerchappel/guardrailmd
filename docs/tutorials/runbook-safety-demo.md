# Runbook Safety Demo

This tutorial uses the repository's intentionally risky Markdown fixture to
show how GuardrailMD reports unsafe agent-runbook instructions.

## Run the fixture scan

```sh
npm install
npm run build
node dist/cli.js scan examples/risky-runbook.md \
  --format human \
  --fail-on high
```

The command is expected to exit non-zero because the fixture contains high
patterns. That failure is the demo signal: CI or an agent handoff can stop
before executing risky instructions.

## Capture machine-readable evidence

```sh
node dist/cli.js scan examples/risky-runbook.md \
  --format json \
  --output /tmp/guardrailmd-risky-runbook.json \
  --fail-on high
test -s /tmp/guardrailmd-risky-runbook.json
```

JSON output is useful for bots, agent gateways, or release evidence. Keep the
human output for review comments when people need to understand what triggered
the stop.

## What the fixture demonstrates

- Curl-to-shell install text in a shell block.
- A destructive `rm -rf` command.
- Destructive prose without nearby backup, dry-run, approval, confirmation, or
  rollback language.

## Local safety note

GuardrailMD scans Markdown text. It does not execute the commands inside the
runbook, call external services, or mutate external systems.
