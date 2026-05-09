import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defaultConfig } from "./defaults.js";
function asConfigPatch(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error("guardrailmd config must be a JSON object");
    }
    return value;
}
export function resolveConfigPath(cwd, explicitPath) {
    if (explicitPath)
        return resolve(cwd, explicitPath);
    const candidate = resolve(cwd, "guardrailmd.config.json");
    return existsSync(candidate) ? candidate : undefined;
}
export function loadConfig(cwd, explicitPath) {
    const path = resolveConfigPath(cwd, explicitPath);
    if (!path)
        return structuredClone(defaultConfig);
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
//# sourceMappingURL=load.js.map