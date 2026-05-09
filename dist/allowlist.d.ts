export declare function collectAllowlistedLines(markdown: string, allowlistComment: string): Set<number>;
export declare function isAllowed(line: number, allowlistedLines: ReadonlySet<number>): boolean;
