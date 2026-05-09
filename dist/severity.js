export const severityOrder = {
    info: 0,
    low: 1,
    medium: 2,
    high: 3,
    critical: 4
};
export const severities = Object.keys(severityOrder);
export function isSeverity(value) {
    return value in severityOrder;
}
export function meetsThreshold(actual, threshold) {
    return severityOrder[actual] >= severityOrder[threshold];
}
//# sourceMappingURL=severity.js.map