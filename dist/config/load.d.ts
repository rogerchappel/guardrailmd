import type { GuardrailConfig } from "../types.js";
export declare function resolveConfigPath(cwd: string, explicitPath?: string): string | undefined;
export declare function loadConfig(cwd: string, explicitPath?: string): GuardrailConfig;
