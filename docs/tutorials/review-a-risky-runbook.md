# Review a Risky Agent Runbook

This walkthrough uses the checked-in `examples/risky-runbook.md` fixture to show how GuardrailMD turns a Markdown runbook into review evidence before an agent or human follows it.

## Scenario

The fixture includes intentionally risky patterns for demonstration, including destructive shell, install-from-network style commands, and secret-looking values. GuardrailMD does not execute the runbook; it reads the Markdown and reports likely safety concerns.

## Run the scan

```sh
npm install
bash demo/runbook-safety-scan.sh
```

The script builds the local CLI, scans the fixture in human and JSON formats, and writes both reports under `${TMPDIR:-/tmp}/guardrailmd-demo`.

## Inspect the evidence

```sh
sed -n '1,120p' "${TMPDIR:-/tmp}/guardrailmd-demo/risky-runbook.txt"
node -e "const r=require(process.env.TMPDIR ? process.env.TMPDIR + '/guardrailmd-demo/risky-runbook.json' : '/tmp/guardrailmd-demo/risky-runbook.json'); console.log(r.findings?.length ?? 0)"
```

Use the human report during local review. Use the JSON report when another tool, CI job, or agent needs stable structured evidence.

## What to fix

- Add dry-run, backup, rollback, or explicit approval language near destructive commands.
- Replace real-looking secrets with placeholders.
- Avoid `curl | sh` style setup in runbooks unless the source, integrity check, and sandbox are clearly documented.

## Limitations

GuardrailMD is deterministic Markdown lint, not a formal proof. It highlights patterns that deserve review; it does not decide whether a real operation is safe in your environment.
