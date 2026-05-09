export interface MarkdownLine {
  line: number;
  text: string;
  inFence: boolean;
}

export function splitMarkdown(markdown: string): MarkdownLine[] {
  const lines = markdown.split(/\r?\n/);
  let inFence = false;
  return lines.map((text, index) => {
    if (/^\s*(```|~~~)/.test(text)) {
      const current = { line: index + 1, text, inFence };
      inFence = !inFence;
      return current;
    }
    return { line: index + 1, text, inFence };
  });
}

export function lineColumn(text: string, needle: string): number {
  const index = text.toLowerCase().indexOf(needle.toLowerCase());
  return index >= 0 ? index + 1 : 1;
}
