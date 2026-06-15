# GuardrailMD Social Hooks

Use these as draft copy for posts or short video captions. They are grounded in
the current repository behavior and avoid adoption claims.

Grounded sources: `README.md`, `examples/risky-runbook.md`,
`demo/runbook-safety-scan.sh`, `examples/agent-runbook-review.sh`, and
`docs/SAFETY.md`.

## Short Posts

1. Agent runbooks deserve the same review pressure as code. GuardrailMD scans Markdown for risky shell, secret-looking values, webhook/API writes, and missing safety language before anyone follows the instructions.

2. New demo: run `bash demo/runbook-safety-scan.sh` in GuardrailMD to generate human and JSON reports from an intentionally risky runbook fixture. Local-only, deterministic, and safe to inspect.

3. If your agent workflow starts with a Markdown checklist, GuardrailMD can make the risky parts visible: destructive commands, secret-looking literals, external write patterns, and missing rollback/approval context.

4. Your agent runbook can look harmless until it says `curl | sh` or `rm -rf`.
  GuardrailMD catches those Markdown instructions before a human or agent acts.

5. Markdown is executable context now. GuardrailMD gives runbooks a local safety
  lint before they reach CI, an agent gateway, or an operations checklist.

6. A runbook scanner should not need network access. GuardrailMD reads local
  Markdown, reports risky patterns, and can emit human, JSON, or SARIF output.

7. Before handing docs to a coding agent, scan for destructive shell, token-like
  literals, external writes, and destructive prose that lacks safeguards.

8. The demo is intentionally simple: one risky runbook, one human report, one
   JSON report. The point is to make dangerous instructions visible before they
   become an automated action.

9. `guardrailmd` does not execute the commands it finds. It reads local Markdown
   and reports the places a maintainer should review before handing the file to
   CI or an agent.

## Video Angle

Show a risky runbook on the left, run the demo script, then open the human report and JSON report. The practical takeaway: reviewers can catch dangerous instructions before they become agent actions.

## Demo CTA

```sh
npm run build
bash examples/agent-runbook-review.sh
```

## Limits to say plainly

GuardrailMD is a linting tool for common risky Markdown patterns. It does not
prove a runbook is safe, understand every shell program, or execute commands.
