import type { ScanResult } from "../types.js";

export function renderJson(result: ScanResult): string {
  return `${JSON.stringify({
    tool: "guardrailmd",
    filesScanned: result.filesScanned,
    findingCount: result.findings.length,
    findings: result.findings
  }, null, 2)}\n`;
}
