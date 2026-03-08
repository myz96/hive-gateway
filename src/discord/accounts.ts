/** Stub - Discord not supported in hive-gateway. */
export function createDiscordActionGate(): { gate: () => boolean } {
  return { gate: () => false };
}

export function listEnabledDiscordAccounts(_cfg: unknown): string[] {
  return [];
}

export function resolveDiscordAccount(_params: unknown): undefined {
  return undefined;
}
