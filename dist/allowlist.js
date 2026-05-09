import { splitMarkdown } from "./markdown.js";
export function collectAllowlistedLines(markdown, allowlistComment) {
    const allowed = new Set();
    for (const line of splitMarkdown(markdown)) {
        if (line.text.includes(allowlistComment)) {
            allowed.add(line.line);
            allowed.add(line.line + 1);
        }
    }
    return allowed;
}
export function isAllowed(line, allowlistedLines) {
    return allowlistedLines.has(line);
}
//# sourceMappingURL=allowlist.js.map