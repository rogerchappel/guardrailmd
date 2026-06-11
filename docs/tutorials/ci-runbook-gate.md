# CI runbook gate demo

This tutorial shows how to use GuardrailMD as a lightweight CI gate before an
agent or operator follows a Markdown runbook.

## Run it locally

```bash
npm install
npm run build
bash examples/ci-runbook-gate.sh
```

The demo scans two existing examples:

- `examples/runbooks/cache-purge-unsafe.md` is expected to fail and writes JSON
  evidence under `${TMPDIR:-/tmp}/guardrailmd-ci-runbook-gate`.
- `examples/runbooks/cache-purge-reviewed.md` is expected to pass the
  `--fail-on critical` gate while still surfacing any lower-severity follow-up
  findings for review.

## CI command shape

```bash
node dist/cli.js scan docs/runbooks --format sarif --output guardrailmd.sarif
node dist/cli.js scan docs/runbooks --fail-on critical
```

Use SARIF when you want code-scanning upload support, and use human or JSON
output when the report needs to travel in an agent handoff.

## Demo talking points

- GuardrailMD reads Markdown and local JSON config; it does not execute the
  commands it flags.
- The failing fixture is intentional, so reviewers can see the kinds of risky
  shell patterns and destructive prose the scanner catches.
- The thresholded passing fixture demonstrates a practical CI pattern: block on
  critical findings while keeping medium findings visible for review and follow-up.
