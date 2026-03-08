/** Stub - Discord not supported in hive-gateway. */
export type InspectedDiscordAccount = {
  accountId: string;
  config: Record<string, unknown>;
};

export function inspectDiscordAccount(_params: {
  cfg: unknown;
  accountId?: string | null;
}): InspectedDiscordAccount {
  return { accountId: "", config: {} };
}
