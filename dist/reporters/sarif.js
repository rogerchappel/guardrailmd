export function renderSarif(result) {
    const rules = new Map(result.findings.map((finding) => [finding.ruleId, finding]));
    return `${JSON.stringify({
        version: "2.1.0",
        $schema: "https://json.schemastore.org/sarif-2.1.0.json",
        runs: [{
                tool: {
                    driver: {
                        name: "GuardrailMD",
                        informationUri: "https://github.com/rogerchappel/guardrailmd",
                        rules: [...rules.values()].map((finding) => ({
                            id: finding.ruleId,
                            name: finding.title,
                            shortDescription: { text: finding.title },
                            fullDescription: { text: finding.message },
                            help: { text: finding.remediation }
                        }))
                    }
                },
                results: result.findings.map((finding) => ({
                    ruleId: finding.ruleId,
                    level: finding.severity === "critical" || finding.severity === "high" ? "error" : finding.severity === "medium" ? "warning" : "note",
                    message: { text: finding.message },
                    locations: [{
                            physicalLocation: {
                                artifactLocation: { uri: finding.filePath },
                                region: { startLine: finding.line, startColumn: finding.column, snippet: { text: finding.excerpt } }
                            }
                        }]
                }))
            }]
    }, null, 2)}\n`;
}
//# sourceMappingURL=sarif.js.map