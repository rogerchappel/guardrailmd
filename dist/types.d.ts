export type Severity = "info" | "low" | "medium" | "high" | "critical";
export type ReportFormat = "human" | "json" | "sarif";
export interface Finding {
    ruleId: string;
    title: string;
    message: string;
    remediation: string;
    severity: Severity;
    filePath: string;
    line: number;
    column: number;
    excerpt: string;
}
export interface ScanTarget {
    filePath: string;
    markdown: string;
}
export interface RuleContext {
    allowlistedLines: ReadonlySet<number>;
    config: GuardrailConfig;
}
export interface Rule {
    id: string;
    title: string;
    severity: Severity;
    description: string;
    evaluate(target: ScanTarget, context: RuleContext): Finding[];
}
export interface GuardrailConfig {
    failOn: Severity;
    allowlistComment: string;
    riskyShellVerbs: string[];
    externalWriteHosts: string[];
    secretPatterns: Array<{
        name: string;
        pattern: string;
    }>;
    missingConfirmation: {
        destructiveVerbs: string[];
        confirmationWords: string[];
    };
}
export interface ScanOptions {
    cwd: string;
    paths: string[];
    format: ReportFormat;
    output?: string;
    configPath?: string;
    failOn: Severity;
}
export interface ScanResult {
    findings: Finding[];
    filesScanned: number;
    exitCode: number;
}
