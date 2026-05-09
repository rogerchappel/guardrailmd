import { isAllowed } from "../allowlist.js";
import { createFinding } from "../finding.js";
import { lineColumn, splitMarkdown } from "../markdown.js";
import type { Rule } from "../types.js";

export const riskyShellRule: Rule = {
  id: "GMD001",
  title: "Risky shell command",
  severity: "high",
  description: "Flags shell snippets that can delete, overwrite, or irreversibly mutate state.",
  evaluate(target, context) {
    const findings = [];
    for (const line of splitMarkdown(target.markdown)) {
      if (isAllowed(line.line, context.allowlistedLines)) continue;
      const lower = line.text.toLowerCase();
      const matched = context.config.riskyShellVerbs.find((verb) => lower.includes(verb.toLowerCase()));
      if (!matched) continue;
      findings.push(createFinding({
        ruleId: this.id,
        title: this.title,
        severity: this.severity,
        filePath: target.filePath,
        line: line.line,
        column: lineColumn(line.text, matched),
        excerpt: line.text,
        message: `Found risky shell pattern: ${matched}`,
        remediation: "Add explicit confirmation, dry-run guidance, rollback notes, or an allowlist comment when intentional."
      }));
    }
    return findings;
  }
};
