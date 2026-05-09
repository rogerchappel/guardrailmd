import assert from "node:assert/strict";
import { test } from "node:test";
import { scan } from "../dist/index.js";

const cwd = new URL("..", import.meta.url).pathname;

test("scan reports risky shell, external writes, secrets, and confirmation gaps", () => {
  const result = scan({ cwd, paths: ["tests/fixtures/risky-runbook.md"], format: "json", failOn: "critical" });
  assert.equal(result.filesScanned, 1);
  assert.equal(result.exitCode, 1);
  assert.deepEqual(new Set(result.findings.map((finding) => finding.ruleId)), new Set(["GMD001", "GMD002", "GMD003", "GMD004"]));
  assert.ok(result.findings.every((finding) => !finding.excerpt.includes("abc1234567890supersecretvalue")));
});

test("allowlist comments suppress intentional adjacent findings", () => {
  const result = scan({ cwd, paths: ["tests/fixtures/safe-runbook.md"], format: "human", failOn: "low" });
  assert.equal(result.filesScanned, 1);
  assert.equal(result.findings.length, 0);
  assert.equal(result.exitCode, 0);
});
