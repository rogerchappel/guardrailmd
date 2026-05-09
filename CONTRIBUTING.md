# Contributing to GuardrailMD

Thanks for helping make agent-readable docs safer.

## Local setup

```sh
npm install
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```

## Good contributions

- New rules with fixture-backed tests.
- Better remediation copy that helps a maintainer act quickly.
- Reporters that stay deterministic and avoid leaking secrets.
- Docs that clarify agent safety boundaries.

## Rule guidelines

Rules should be conservative enough to avoid noisy adoption blockers, but direct enough to stop scary runbooks before agents execute them. Every new rule should include:

1. At least one risky fixture.
2. At least one safe or allowlisted fixture.
3. Clear remediation text.
4. A stable rule id.

## Safety review

Pause and ask for maintainer review before changing redaction, allowlist semantics, release automation, or anything that adds network access.
