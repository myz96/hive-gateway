/** Stub - Signal not supported in hive-gateway. */
export async function sendMessageSignal(
  _to: string,
  _text: string,
  _options?: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string; messageId: string }> {
  throw new Error("Signal not supported in hive-gateway");
}
