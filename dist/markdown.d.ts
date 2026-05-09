export interface MarkdownLine {
    line: number;
    text: string;
    inFence: boolean;
}
export declare function splitMarkdown(markdown: string): MarkdownLine[];
export declare function lineColumn(text: string, needle: string): number;
