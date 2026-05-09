# Security Policy

## Supported versions

GuardrailMD is pre-1.0. Security fixes will target the latest `main` branch until release tags exist.

## Reporting a vulnerability

Please report security issues privately to the maintainer instead of opening a public issue. Include:

- affected version or commit
- reproduction steps
- expected impact
- whether a secret or unsafe runbook was involved

## Privacy posture

GuardrailMD is local-first:

- no telemetry
- no hosted backend
- no network calls during scanning
- no command execution from scanned Markdown
- no secret collection beyond local pattern matching and redacted reporting

If GuardrailMD reports a real credential, rotate that credential. Redaction reduces accidental display; it is not a substitute for incident response.
