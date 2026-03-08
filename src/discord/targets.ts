/** Stub - Discord not supported in hive-gateway. */
export function parseDiscordTarget(
  _target: string,
): { channelId: string; guildId?: string } | undefined {
  return undefined;
}

export function resolveDiscordChannelId(_target: string): string | undefined {
  return undefined;
}
