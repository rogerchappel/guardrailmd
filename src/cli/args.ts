import { isSeverity } from "../severity.js";
import type { ReportFormat, ScanOptions } from "../types.js";

export interface ParsedCommand {
  command: "scan" | "init" | "help" | "version";
  scan?: ScanOptions;
  init?: { cwd: string; writeConfig: boolean; force: boolean };
}

function take(args: string[], index: number, flag: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

function isFormat(value: string): value is ReportFormat {
  return ["human", "json", "sarif"].includes(value);
}

export function parseArgs(argv: string[], cwd: string): ParsedCommand {
  const [command, ...args] = argv;
  if (!command || command === "--help" || command === "-h") return { command: "help" };
  if (command === "--version" || command === "-v") return { command: "version" };

  if (command === "init") {
    return { command: "init", init: { cwd, writeConfig: args.includes("--write-config"), force: args.includes("--force") } };
  }

  if (command !== "scan") throw new Error(`Unknown command: ${command}`);

  const paths: string[] = [];
  let format: ReportFormat = "human";
  let output: string | undefined;
  let configPath: string | undefined;
  let failOn = "high";
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--format") {
      const value = take(args, i, arg);
      if (!isFormat(value)) throw new Error("--format must be one of: human, json, sarif");
      format = value;
      i += 1;
    } else if (arg === "--output") {
      output = take(args, i, arg);
      i += 1;
    } else if (arg === "--config") {
      configPath = take(args, i, arg);
      i += 1;
    } else if (arg === "--fail-on") {
      failOn = take(args, i, arg);
      if (!isSeverity(failOn)) throw new Error("--fail-on must be one of: info, low, medium, high, critical");
      i += 1;
    } else if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      paths.push(arg);
    }
  }
  if (paths.length === 0) paths.push(".");
  return { command: "scan", scan: { cwd, paths, format, output, configPath, failOn } };
}
