import { isAllowed } from "../allowlist.js";
import { createFinding } from "../finding.js";
import { splitMarkdown } from "../markdown.js";
import type { Rule } from "../types.js";

export const secretLiteralRule: Rule = {
  id: "GMD002",
  title: "Secret-looking literal",
  severity: "critical",
  description: "Detects token-shaped values in docs while redacting excerpts.",
  evaluate(target, context) {
    const compiled = context.config.secretPatterns.map((entry) => ({
      name: entry.name,
      regex: new RegExp(entry.pattern, "g")
    }));
    const findings = [];
    for (const line of splitMarkdown(target.markdown)) {
      if (isAllowed(line.line, context.allowlistedLines)) continue;
      for (const entry of compiled) {
        entry.regex.lastIndex = 0;
        const match = entry.regex.exec(line.text);
        if (!match) continue;
        findings.push(createFinding({
          ruleId: this.id,
          title: this.title,
          severity: this.severity,
          filePath: target.filePath,
          line: line.line,
          column: match.index + 1,
          excerpt: line.text,
          message: `Found ${entry.name} shaped literal in Markdown.`,
          remediation: "Replace secrets with placeholders, rotate exposed values, and keep credentials out of runbooks."
        }));
      }
    }
    return findings;
  }
};
