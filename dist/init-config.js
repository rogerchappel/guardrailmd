import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defaultConfig } from "./config/defaults.js";
export function writeDefaultConfig(cwd, force = false) {
    const path = resolve(cwd, "guardrailmd.config.json");
    if (existsSync(path) && !force) {
        throw new Error("guardrailmd.config.json already exists; pass --force to overwrite");
    }
    writeFileSync(path, `${JSON.stringify(defaultConfig, null, 2)}\n`, "utf8");
    return path;
}
//# sourceMappingURL=init-config.js.map