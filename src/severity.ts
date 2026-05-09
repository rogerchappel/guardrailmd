import type { Severity } from "./types.js";

export const severityOrder: Record<Severity, number> = {
  info: 0,
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
};

export const severities = Object.keys(severityOrder) as Severity[];

export function isSeverity(value: string): value is Severity {
  return value in severityOrder;
}

export function meetsThreshold(actual: Severity, threshold: Severity): boolean {
  return severityOrder[actual] >= severityOrder[threshold];
}
