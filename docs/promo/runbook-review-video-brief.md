# Video Brief: Lint A Runbook Before An Agent Uses It

## Angle

Show GuardrailMD scanning a Markdown cache-purge runbook and explaining why a command block or destructive instruction needs review before an agent acts on it.

## Grounded product facts

- GuardrailMD scans local Markdown.
- It flags risky shell patterns, secret-looking literals, likely external writes, and destructive prose without nearby safety context.
- It supports human, JSON, and SARIF reports.
- It can initialize a default config with `guardrailmd init --write-config`.
- It does not execute runbook commands.

## Demo flow

1. Open `examples/runbooks/cache-purge-unsafe.md`.
2. Run:

   ```bash
   npm run build
   node dist/cli.js scan examples/runbooks/cache-purge-unsafe.md --format human
   ```

3. Open `examples/runbooks/cache-purge-reviewed.md`.
4. Run the same scan on the reviewed fixture.
5. Close on the limitation: this is Markdown safety lint, not runtime isolation or proof that an operation is safe.

## Short hooks

- "Runbooks are instructions. Agents can follow them too literally."
- "GuardrailMD catches risky Markdown before it becomes an action."
- "The useful report is the one that points to the command and explains the concern."
