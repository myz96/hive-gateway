/** Stub - Discord not supported in hive-gateway. */
export function createDiscordActionGate(): { gate: () => boolean } {
  return { gate: () => false };
}

export function listEnabledDiscordAccounts(_cfg: unknown): string[] {
  return [];
}

export function resolveDiscordAccount(_params: unknown): {
  token?: string;
  config: {
    allowFrom?: Array<string | number>;
    dm?: { allowFrom?: Array<string | number> };
    groupPolicy?: string;
    guilds?: Record<
      string,
      {
        users?: Array<string | number>;
        channels?: Record<string, { users?: Array<string | number> }>;
      }
    >;
  };
  channels?: Record<string, { users?: string[] }>;
} {
  return { config: {} };
}
