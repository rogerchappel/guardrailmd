import type { Finding, Severity } from "./types.js";
export declare function createFinding(input: {
    ruleId: string;
    title: string;
    message: string;
    remediation: string;
    severity: Severity;
    filePath: string;
    line: number;
    column: number;
    excerpt: string;
}): Finding;
export declare function redact(value: string): string;
