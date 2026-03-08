/** Stub - Telegram not supported in hive-gateway. */
export type InspectedTelegramAccount = {
  accountId: string;
  config: Record<string, unknown>;
};

export function inspectTelegramAccount(_params: {
  cfg: unknown;
  accountId?: string | null;
}): InspectedTelegramAccount {
  return { accountId: "", config: {} };
}
