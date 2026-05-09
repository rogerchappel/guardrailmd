import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defaultConfig } from "./defaults.js";
import type { GuardrailConfig } from "../types.js";

function asConfigPatch(value: unknown): Partial<GuardrailConfig> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("guardrailmd config must be a JSON object");
  }
  return value as Partial<GuardrailConfig>;
}

export function resolveConfigPath(cwd: string, explicitPath?: string): string | undefined {
  if (explicitPath) return resolve(cwd, explicitPath);
  const candidate = resolve(cwd, "guardrailmd.config.json");
  return existsSync(candidate) ? candidate : undefined;
}

export function loadConfig(cwd: string, explicitPath?: string): GuardrailConfig {
  const path = resolveConfigPath(cwd, explicitPath);
  if (!path) return structuredClone(defaultConfig);

  const patch = asConfigPatch(JSON.parse(readFileSync(path, "utf8")));
  return {
    ...structuredClone(defaultConfig),
    ...patch,
    missingConfirmation: {
      ...defaultConfig.missingConfirmation,
      ...patch.missingConfirmation
    }
  };
}
