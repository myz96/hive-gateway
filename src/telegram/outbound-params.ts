/** Stub - Telegram not supported in hive-gateway. */
export function parseTelegramThreadId(_target: string): number | undefined {
  return undefined;
}

export function resolveTelegramOutboundChatId(_target: string): string {
  return _target;
}

export function resolveTelegramOutboundReplyTo(_params: unknown): number | undefined {
  return undefined;
}
