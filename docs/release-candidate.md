# Release Candidate Checklist

Use this checklist before publishing a GuardrailMD package or tagging a release.

## Verification

- Run `npm run release:check`.
- Confirm `npm run smoke` still reports expected findings for the bundled runbook fixture.
- Inspect `npm pack --dry-run` output and confirm it includes `dist`, `examples`, `README.md`, `LICENSE`, and `SECURITY.md`.

## Evidence

- Record whether JSON, human, and SARIF reporters changed.
- Include any new rule IDs, severities, or allowlist behavior in release notes.
- Link to fixture changes when scanner behavior changes.

## Support Notes

- GuardrailMD must not execute runbook commands during scans.
- Keep sample runbooks synthetic and avoid real credentials or hostnames.
