import type { Severity } from "./types.js";
export declare const severityOrder: Record<Severity, number>;
export declare const severities: Severity[];
export declare function isSeverity(value: string): value is Severity;
export declare function meetsThreshold(actual: Severity, threshold: Severity): boolean;
