import type { OpenClawConfig } from "../config/config.js";

export type TelegramInlineButtonsScope = "off" | "on" | "full";

export function resolveTelegramInlineButtonsScope(_params: {
  cfg: OpenClawConfig;
  accountId?: string;
}): TelegramInlineButtonsScope {
  return "off";
}

export function resolveTelegramTargetChatType(
  _target: string,
): "private" | "group" | "supergroup" | "channel" | "unknown" | undefined {
  return undefined;
}
