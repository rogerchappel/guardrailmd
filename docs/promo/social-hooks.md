# Social Hooks

Use these as draft copy for posts or short video captions. They are grounded in
the current repository behavior and avoid adoption claims.

## Short Posts

1. Your agent runbook can look harmless until it says `curl | sh` or `rm -rf`.
  GuardrailMD catches those Markdown instructions before a human or agent acts.

2. Markdown is executable context now. GuardrailMD gives runbooks a local safety
  lint before they reach CI, an agent gateway, or an operations checklist.

3. A runbook scanner should not need network access. GuardrailMD reads local
  Markdown, reports risky patterns, and can emit human, JSON, or SARIF output.

4. Before handing docs to a coding agent, scan for destructive shell, token-like
  literals, external writes, and destructive prose that lacks safeguards.

5. The demo is intentionally simple: one risky runbook, one human report, one
   JSON report. The point is to make dangerous instructions visible before they
   become an automated action.

6. `guardrailmd` does not execute the commands it finds. It reads local Markdown
   and reports the places a maintainer should review before handing the file to
   CI or an agent.

## Demo CTA

```sh
npm run build
bash examples/agent-runbook-review.sh
```

## Limits to say plainly

GuardrailMD is a linting tool for common risky Markdown patterns. It does not
prove a runbook is safe, understand every shell program, or execute commands.
