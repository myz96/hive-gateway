/** Stub - Telegram not supported in hive-gateway. */
export function buildTelegramGroupPeerId(_chatId: string | number, _threadId?: number): string {
  return String(_chatId);
}
