export function splitMarkdown(markdown) {
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
export function lineColumn(text, needle) {
    const index = text.toLowerCase().indexOf(needle.toLowerCase());
    return index >= 0 ? index + 1 : 1;
}
//# sourceMappingURL=markdown.js.map