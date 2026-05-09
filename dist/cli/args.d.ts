import type { ScanOptions } from "../types.js";
export interface ParsedCommand {
    command: "scan" | "init" | "help" | "version";
    scan?: ScanOptions;
    init?: {
        cwd: string;
        writeConfig: boolean;
        force: boolean;
    };
}
export declare function parseArgs(argv: string[], cwd: string): ParsedCommand;
