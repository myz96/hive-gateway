/** Stub - Telegram not supported in hive-gateway. */
export function parseTelegramTarget(
  _target: string,
): { chatId: string; threadId?: string } | undefined {
  return undefined;
}

export function normalizeTelegramLookupTarget(_target: string): string {
  return _target;
}

export function resolveTelegramTargetChatType(
  _target: string,
): "private" | "group" | "supergroup" | "channel" | undefined {
  return undefined;
}
