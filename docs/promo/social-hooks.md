# Social Hook Pack: GuardrailMD

Use these as draft copy for posts or short video captions. They are grounded in
the current repository behavior and avoid adoption claims.

## Hooks

- Your agent runbook can look harmless until it says `curl | sh` or `rm -rf`.
  GuardrailMD catches those Markdown instructions before a human or agent acts.
- Markdown is executable context now. GuardrailMD gives runbooks a local safety
  lint before they reach CI, an agent gateway, or an operations checklist.
- A runbook scanner should not need network access. GuardrailMD reads local
  Markdown, reports risky patterns, and can emit human, JSON, or SARIF output.
- Before handing docs to a coding agent, scan for destructive shell, token-like
  literals, external writes, and destructive prose that lacks safeguards.

## Demo command

```sh
npm run build
node dist/cli.js scan examples/risky-runbook.md --format human --fail-on high
```

## Limits to say plainly

GuardrailMD is a linting tool for common risky Markdown patterns. It does not
prove a runbook is safe, understand every shell program, or execute commands.
