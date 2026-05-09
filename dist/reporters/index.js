import { renderHuman } from "./human.js";
import { renderJson } from "./json.js";
import { renderSarif } from "./sarif.js";
export function renderReport(format, result) {
    if (format === "json")
        return renderJson(result);
    if (format === "sarif")
        return renderSarif(result);
    return `${renderHuman(result)}\n`;
}
//# sourceMappingURL=index.js.map