import type { ScanResult } from "../types.js";

export function renderHuman(result: ScanResult): string {
  if (result.findings.length === 0) {
    return `GuardrailMD scanned ${result.filesScanned} Markdown file(s). No findings.`;
  }

  const lines = [`GuardrailMD scanned ${result.filesScanned} Markdown file(s) and found ${result.findings.length} issue(s).`, ""];
  for (const finding of result.findings) {
    lines.push(`${finding.filePath}:${finding.line}:${finding.column} ${finding.severity.toUpperCase()} ${finding.ruleId} ${finding.title}`);
    lines.push(`  ${finding.message}`);
    lines.push(`  Excerpt: ${finding.excerpt}`);
    lines.push(`  Fix: ${finding.remediation}`);
    lines.push("");
  }
  return lines.join("\n").trimEnd();
}
