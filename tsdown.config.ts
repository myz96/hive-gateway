import { defineConfig } from "tsdown";

const env = {
  NODE_ENV: "production",
};

const pluginSdkEntrypoints = [
  "index",
  "core",
  "compat",
  "slack",
  "acpx",
  "copilot-proxy",
  "diagnostics-otel",
  "diffs",
  "llm-task",
  "memory-core",
  "memory-lancedb",
  "test-utils",
  "thread-ownership",
  "account-id",
  "keyed-async-queue",
] as const;

export default defineConfig([
  {
    entry: "src/index.ts",
    env,
    fixedExtension: false,
    platform: "node",
  },
  {
    entry: "src/entry.ts",
    env,
    fixedExtension: false,
    platform: "node",
  },
  {
    // Ensure this module is bundled as an entry so legacy CLI shims can resolve its exports.
    entry: "src/cli/daemon-cli.ts",
    env,
    fixedExtension: false,
    platform: "node",
  },
  {
    entry: "src/infra/warning-filter.ts",
    env,
    fixedExtension: false,
    platform: "node",
  },
  ...pluginSdkEntrypoints.map((entry) => ({
    entry: `src/plugin-sdk/${entry}.ts`,
    outDir: "dist/plugin-sdk",
    env,
    fixedExtension: false,
    platform: "node" as const,
  })),
  {
    entry: "src/extensionAPI.ts",
    env,
    fixedExtension: false,
    platform: "node",
  },
  {
    entry: ["src/hooks/bundled/*/handler.ts", "src/hooks/llm-slug-generator.ts"],
    env,
    fixedExtension: false,
    platform: "node",
  },
]);
