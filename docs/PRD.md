# GuardrailMD PRD

Status: in-progress

## One-liner

Markdown safety lint for agent runbooks.

## Summary

A local-first CLI that scans Markdown instructions, runbooks, and agent prompts for risky automation patterns, missing safety boundaries, and ambiguous destructive steps.

## Problem

Agent-readable docs increasingly contain commands that can delete data, leak secrets, or mutate external services. Teams need a lightweight preflight before handing Markdown to agents.

## Target users

OSS maintainers, agentic coding teams, platform engineers, security-minded solo devs.

## V1 scope

- Scan Markdown files/directories for risky shell verbs, secret-looking literals, external-write steps, and missing confirmation language
- Emit human, JSON, and SARIF reports with line numbers and severity
- Support allowlist comments for intentional patterns
- Provide a rules config with safe defaults and fixture-backed tests
- Offer --fail-on severity for CI and local hooks

## CLI shape

```bash
guardrailmd scan README.md docs/
guardrailmd scan . --format sarif --output guardrailmd.sarif
guardrailmd init --write-config
```

## Non-goals

- No SaaS backend.
- No hidden telemetry.
- No external posting or mutation by default.
- No secret collection beyond explicit, redacted local inputs.

## Differentiation

Unlike generic secret scanners, GuardrailMD focuses on agent instruction safety and human-readable remediation in docs.

## Safety and privacy

- Local-first by default.
- Explicit opt-in for any external command preview/execution.
- Fixture-backed tests for parsing, reporting, and redaction behavior.
- Clear failure modes and deterministic output suitable for CI.

## Acceptance criteria

- TypeScript CLI scaffolded with StackForge under `/Users/roger/Developer/my-opensource/guardrailmd`.
- `docs/PRD.md`, `docs/TASKS.md`, `docs/ORCHESTRATION.md`, and `docs/orchestration.json` exist.
- Functional MVP with fixtures and tests.
- `npm test`, `npm run check`, `npm run build`, `npm run smoke`, and `bash scripts/validate.sh` pass where present.
- Public GitHub repository `rogerchappel/guardrailmd` exists with useful description and topics.
- Branch protection attempted for `main`.

## Source attribution

Original local-first idea based on recurring OSS Factory/agent runbook safety needs. Web research was attempted during selection, but the configured search API returned rate-limit/plan errors.
