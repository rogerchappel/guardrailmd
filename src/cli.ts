#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "./cli/args.js";
import { helpText } from "./cli/help.js";
import { writeDefaultConfig } from "./init-config.js";
import { renderReport } from "./reporters/index.js";
import { scan } from "./scanner.js";

export async function main(argv = process.argv.slice(2), cwd = process.cwd()): Promise<number> {
  try {
    const parsed = parseArgs(argv, cwd);
    if (parsed.command === "help") {
      process.stdout.write(helpText());
      return 0;
    }
    if (parsed.command === "version") {
      process.stdout.write("guardrailmd 0.1.0\n");
      return 0;
    }
    if (parsed.command === "init") {
      if (!parsed.init?.writeConfig) throw new Error("init currently requires --write-config");
      const path = writeDefaultConfig(parsed.init.cwd, parsed.init.force);
      process.stdout.write(`Wrote ${path}\n`);
      return 0;
    }
    if (!parsed.scan) throw new Error("scan options were not parsed");
    const result = scan(parsed.scan);
    const rendered = renderReport(parsed.scan.format, result);
    if (parsed.scan.output) writeFileSync(resolve(cwd, parsed.scan.output), rendered, "utf8");
    else process.stdout.write(rendered);
    return result.exitCode;
  } catch (error) {
    process.stderr.write(`guardrailmd: ${error instanceof Error ? error.message : String(error)}\n`);
    return 2;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exitCode = await main();
}
