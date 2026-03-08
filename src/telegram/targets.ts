/** Stub - Telegram not supported in hive-gateway. */
export function parseTelegramTarget(_target: string): {
  chatId: string;
  threadId?: string;
  messageThreadId?: number;
} {
  return { chatId: "" };
}

export function normalizeTelegramLookupTarget(_target: string): string {
  return _target;
}

export function resolveTelegramTargetChatType(
  _target: string,
): "direct" | "group" | "channel" | "unknown" | undefined {
  return undefined;
}
