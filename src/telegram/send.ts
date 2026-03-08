/** Stub - Telegram not supported in hive-gateway. */
export async function sendMessageTelegram(
  ..._args: unknown[]
): Promise<{ ok: boolean; messageId?: string }> {
  throw new Error("Telegram not supported in hive-gateway");
}
