/** Stub - Signal not supported in hive-gateway. */
export async function sendMessageSignal(..._args: unknown[]): Promise<void> {
  throw new Error("Signal not supported in hive-gateway");
}
