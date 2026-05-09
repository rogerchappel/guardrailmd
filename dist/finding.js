export function createFinding(input) {
    return {
        ...input,
        excerpt: redact(input.excerpt.trim())
    };
}
export function redact(value) {
    return value
        .replace(/gh[pousr]_[A-Za-z0-9_]{8,}/g, "gh*_REDACTED")
        .replace(/xox[baprs]-[A-Za-z0-9-]{8,}/g, "xox*-REDACTED")
        .replace(/AKIA[0-9A-Z]{16}/g, "AKIA_REDACTED")
        .replace(/((?:api[_-]?key|token|secret)\s*[:=]\s*['\"]?)[A-Za-z0-9_./+-]{8,}/gi, "$1REDACTED");
}
//# sourceMappingURL=finding.js.map