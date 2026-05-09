export function helpText(): string {
  return `GuardrailMD - Markdown safety lint for agent runbooks

Usage:
  guardrailmd scan [paths...] [--format human|json|sarif] [--output file] [--fail-on severity]
  guardrailmd init --write-config

Examples:
  guardrailmd scan README.md docs/
  guardrailmd scan . --format sarif --output guardrailmd.sarif
  guardrailmd scan tests/fixtures --fail-on critical

Allowlist intentional lines with an inline or preceding comment:
  <!-- guardrailmd-ignore: documented destructive recovery drill -->
`;
}
