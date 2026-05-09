import { renderHuman } from "./human.js";
import { renderJson } from "./json.js";
import { renderSarif } from "./sarif.js";
import type { ReportFormat, ScanResult } from "../types.js";

export function renderReport(format: ReportFormat, result: ScanResult): string {
  if (format === "json") return renderJson(result);
  if (format === "sarif") return renderSarif(result);
  return `${renderHuman(result)}\n`;
}
