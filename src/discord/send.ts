/** Stub - Discord not supported in hive-gateway. */
export async function sendMessageDiscord(..._args: unknown[]): Promise<void> {
  throw new Error("Discord not supported in hive-gateway");
}

export async function sendPollDiscord(..._args: unknown[]): Promise<void> {
  throw new Error("Discord not supported in hive-gateway");
}

export async function fetchChannelPermissionsDiscord(_params: unknown): Promise<unknown> {
  return undefined;
}
