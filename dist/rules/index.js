import { missingConfirmationRule } from "./confirmation.js";
import { externalWriteRule } from "./external-write.js";
import { riskyShellRule } from "./risky-shell.js";
import { secretLiteralRule } from "./secrets.js";
export const defaultRules = [
    riskyShellRule,
    secretLiteralRule,
    externalWriteRule,
    missingConfirmationRule
];
//# sourceMappingURL=index.js.map