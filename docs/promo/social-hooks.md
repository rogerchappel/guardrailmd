# Social Hooks

## Short Posts

1. Before an agent follows a Markdown runbook, scan the instructions. `guardrailmd` flags risky shell patterns, secret-looking literals, external writes, and destructive prose that lacks confirmation context.

2. The demo is intentionally simple: one risky runbook, one human report, one JSON report. The point is to make dangerous instructions visible before they become an automated action.

3. `guardrailmd` does not execute the commands it finds. It reads local Markdown and reports the places a maintainer should review before handing the file to CI or an agent.

## Demo CTA

```sh
npm run build
bash examples/agent-runbook-review.sh
```

