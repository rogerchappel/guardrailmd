# GuardrailMD Tasks

## MVP build

- [x] Scaffold `oss-cli` project with StackForge from the GuardrailMD PRD.
- [x] Rename package metadata to `guardrailmd` and expose a CLI binary.
- [x] Implement Markdown discovery for files and directories.
- [x] Detect risky shell commands with line numbers.
- [x] Detect secret-looking literals and redact excerpts.
- [x] Detect likely external service writes.
- [x] Detect destructive prose without nearby confirmation language.
- [x] Support allowlist comments for intentional findings.
- [x] Support human, JSON, and SARIF output.
- [x] Support `--fail-on` severity for CI.
- [x] Support `init --write-config`.
- [x] Add fixture-backed tests and smoke scripts.
- [x] Add README, examples, safety, contribution, and security docs.

## Near follow-ups

- [ ] Add rule-level config toggles and severity overrides.
- [ ] Add inline range allowlists with expiry metadata.
- [ ] Publish npm package after a human release review.
- [ ] Add pre-commit hook examples.
- [ ] Expand SARIF metadata with stable rule docs URLs.
