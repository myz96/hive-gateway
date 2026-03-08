/** Stub - Discord not supported in hive-gateway. */
export function parseDiscordTarget(
  _target: string,
  _options?: { defaultKind?: string },
): { id: string; channelId: string; guildId?: string; kind?: string } | undefined {
  return undefined;
}

export function resolveDiscordChannelId(_target: string): string | undefined {
  return undefined;
}
