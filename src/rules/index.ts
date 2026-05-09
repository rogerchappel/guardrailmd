import type { Rule } from "../types.js";
import { missingConfirmationRule } from "./confirmation.js";
import { externalWriteRule } from "./external-write.js";
import { riskyShellRule } from "./risky-shell.js";
import { secretLiteralRule } from "./secrets.js";

export const defaultRules: Rule[] = [
  riskyShellRule,
  secretLiteralRule,
  externalWriteRule,
  missingConfirmationRule
];
