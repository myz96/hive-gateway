/** Stub - Telegram not supported in hive-gateway. */
export function listTelegramAccountIds(_cfg: unknown): string[] {
  return [];
}

type TelegramAccountConfig = {
  config: {
    allowFrom?: Array<string | number>;
    groupAllowFrom?: Array<string | number>;
    dmPolicy?: string;
    groupPolicy?: string;
    groups?: Record<
      string,
      {
        allowFrom?: Array<string | number>;
        topics?: Record<string, { allowFrom?: Array<string | number> }>;
      }
    >;
  };
};

export function resolveTelegramAccount(_params: unknown): TelegramAccountConfig {
  return { config: {} };
}

export function listEnabledTelegramAccounts(_cfg: unknown): string[] {
  return [];
}
