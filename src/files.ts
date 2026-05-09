import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import type { ScanTarget } from "./types.js";

const ignoredDirs = new Set([".git", "node_modules", "dist", "coverage"]);

function collect(path: string, output: string[]): void {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) {
      if (ignoredDirs.has(entry)) continue;
      collect(join(path, entry), output);
    }
    return;
  }
  if (stat.isFile() && [".md", ".markdown"].includes(extname(path).toLowerCase())) {
    output.push(path);
  }
}

export function readTargets(cwd: string, paths: string[]): ScanTarget[] {
  const files: string[] = [];
  for (const input of paths) collect(resolve(cwd, input), files);
  return [...new Set(files)].sort().map((filePath) => ({
    filePath,
    markdown: readFileSync(filePath, "utf8")
  }));
}
