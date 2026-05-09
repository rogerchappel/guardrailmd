import assert from "node:assert/strict";
import { test } from "node:test";
import { renderReport } from "../dist/index.js";

const result = {
  filesScanned: 1,
  exitCode: 1,
  findings: [{
    ruleId: "GMD001",
    title: "Risky shell command",
    message: "Found risky shell pattern: rm -rf",
    remediation: "Add confirmation.",
    severity: "high",
    filePath: "README.md",
    line: 2,
    column: 1,
    excerpt: "rm -rf tmp"
  }]
};

test("renders human reports", () => {
  assert.match(renderReport("human", result), /README.md:2:1 HIGH GMD001/);
});

test("renders JSON reports", () => {
  assert.equal(JSON.parse(renderReport("json", result)).findingCount, 1);
});

test("renders SARIF reports", () => {
  const sarif = JSON.parse(renderReport("sarif", result));
  assert.equal(sarif.version, "2.1.0");
  assert.equal(sarif.runs[0].results[0].ruleId, "GMD001");
});
