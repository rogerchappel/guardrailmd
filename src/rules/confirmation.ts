import { isAllowed } from "../allowlist.js";
import { createFinding } from "../finding.js";
import { lineColumn, splitMarkdown } from "../markdown.js";
import type { Rule } from "../types.js";

export const missingConfirmationRule: Rule = {
  id: "GMD004",
  title: "Missing destructive-step confirmation",
  severity: "medium",
  description: "Catches destructive prose that lacks confirmation, backup, dry-run, or rollback language nearby.",
  evaluate(target, context) {
    const lines = splitMarkdown(target.markdown);
    const findings = [];
    for (const line of lines) {
      if (isAllowed(line.line, context.allowlistedLines)) continue;
      const lower = line.text.toLowerCase();
      const verb = context.config.missingConfirmation.destructiveVerbs.find((candidate) => new RegExp(`\\b${candidate}\\b`, "i").test(line.text));
      if (!verb) continue;
      const nearby = lines
        .filter((candidate) => Math.abs(candidate.line - line.line) <= 2)
        .map((candidate) => candidate.text.toLowerCase())
        .join("\n");
      const hasConfirmation = context.config.missingConfirmation.confirmationWords.some((word) => nearby.includes(word.toLowerCase()));
      if (hasConfirmation) continue;
      findings.push(createFinding({
        ruleId: this.id,
        title: this.title,
        severity: this.severity,
        filePath: target.filePath,
        line: line.line,
        column: lineColumn(line.text, verb),
        excerpt: line.text,
        message: `Destructive verb "${verb}" lacks nearby confirmation or rollback language.`,
        remediation: "Add an approval checkpoint, dry-run first step, backup requirement, or rollback instructions."
      }));
    }
    return findings;
  }
};
