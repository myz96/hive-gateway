import type { OpenClawConfig } from "../config/config.js";

export function resolveSignalReactionLevel(_params: { cfg: OpenClawConfig; accountId?: string }): {
  agentReactionGuidance?: "minimal" | "extensive";
} {
  return {};
}
