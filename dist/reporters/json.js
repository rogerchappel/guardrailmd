export function renderJson(result) {
    return `${JSON.stringify({
        tool: "guardrailmd",
        filesScanned: result.filesScanned,
        findingCount: result.findings.length,
        findings: result.findings
    }, null, 2)}\n`;
}
//# sourceMappingURL=json.js.map