import { relative } from "node:path";
import { collectAllowlistedLines } from "./allowlist.js";
import { loadConfig } from "./config/load.js";
import { readTargets } from "./files.js";
import { defaultRules } from "./rules/index.js";
import { meetsThreshold } from "./severity.js";
export function scan(options) {
    const loaded = loadConfig(options.cwd, options.configPath);
    const config = { ...loaded, failOn: options.failOn };
    const targets = readTargets(options.cwd, options.paths);
    const findings = [];
    for (const target of targets) {
        const allowlistedLines = collectAllowlistedLines(target.markdown, config.allowlistComment);
        const normalizedTarget = {
            ...target,
            filePath: relative(options.cwd, target.filePath) || target.filePath
        };
        for (const rule of defaultRules) {
            findings.push(...rule.evaluate(normalizedTarget, { allowlistedLines, config }));
        }
    }
    findings.sort((a, b) => a.filePath.localeCompare(b.filePath) || a.line - b.line || a.ruleId.localeCompare(b.ruleId));
    const exitCode = findings.some((finding) => meetsThreshold(finding.severity, config.failOn)) ? 1 : 0;
    return { findings, filesScanned: targets.length, exitCode };
}
//# sourceMappingURL=scanner.js.map