import { splitMarkdown } from "./markdown.js";

export function collectAllowlistedLines(markdown: string, allowlistComment: string): Set<number> {
  const allowed = new Set<number>();
  for (const line of splitMarkdown(markdown)) {
    if (line.text.includes(allowlistComment)) {
      allowed.add(line.line);
      allowed.add(line.line + 1);
    }
  }
  return allowed;
}

export function isAllowed(line: number, allowlistedLines: ReadonlySet<number>): boolean {
  return allowlistedLines.has(line);
}
