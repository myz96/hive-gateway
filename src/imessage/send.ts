/** Stub - iMessage not supported in hive-gateway. */
export async function sendMessageIMessage(
  ..._args: unknown[]
): Promise<{ ok: boolean; messageId?: string }> {
  throw new Error("iMessage not supported in hive-gateway");
}
