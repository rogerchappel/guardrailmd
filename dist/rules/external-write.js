import { isAllowed } from "../allowlist.js";
import { createFinding } from "../finding.js";
import { lineColumn, splitMarkdown } from "../markdown.js";
export const externalWriteRule = {
    id: "GMD003",
    title: "External write endpoint",
    severity: "medium",
    description: "Highlights runbook steps that appear to post or mutate external services.",
    evaluate(target, context) {
        const findings = [];
        for (const line of splitMarkdown(target.markdown)) {
            if (isAllowed(line.line, context.allowlistedLines))
                continue;
            const lower = line.text.toLowerCase();
            const hasWriteVerb = /\b(post|put|patch|delete|upload|send|publish)\b/.test(lower) || /curl\s+[^\n]*(?:-x\s*)?(post|put|patch|delete)/i.test(line.text);
            if (!hasWriteVerb)
                continue;
            const host = context.config.externalWriteHosts.find((candidate) => lower.includes(candidate.toLowerCase()));
            if (!host)
                continue;
            findings.push(createFinding({
                ruleId: this.id,
                title: this.title,
                severity: this.severity,
                filePath: target.filePath,
                line: line.line,
                column: lineColumn(line.text, host),
                excerpt: line.text,
                message: `Found possible external write to ${host}.`,
                remediation: "Require explicit opt-in, preview mode, and destination review before external mutation."
            }));
        }
        return findings;
    }
};
//# sourceMappingURL=external-write.js.map