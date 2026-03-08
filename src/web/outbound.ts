/** Stub - WhatsApp/Web not supported in hive-gateway. */
export async function sendMessageWhatsApp(
  ..._args: unknown[]
): Promise<{ ok: boolean; messageId?: string }> {
  throw new Error("WhatsApp not supported in hive-gateway");
}

export async function sendPollWhatsApp(
  ..._args: unknown[]
): Promise<{ ok: boolean; messageId?: string }> {
  throw new Error("WhatsApp not supported in hive-gateway");
}

export async function sendReactionWhatsApp(..._args: unknown[]): Promise<void> {
  throw new Error("WhatsApp not supported in hive-gateway");
}
