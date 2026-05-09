import assert from "node:assert/strict";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { main } from "../dist/cli.js";

const cwd = new URL("..", import.meta.url).pathname;

test("CLI main returns finding exit code for critical threshold", async () => {
  const code = await main(["scan", "tests/fixtures/risky-runbook.md", "--format", "json", "--fail-on", "critical"], cwd);
  assert.equal(code, 1);
});

test("init writes a config file", async () => {
  const temp = join(cwd, ".tmp-cli-test");
  rmSync(temp, { recursive: true, force: true });
  mkdirSync(temp);
  try {
    const code = await main(["init", "--write-config"], temp);
    assert.equal(code, 0);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
