/** Stub - Signal not supported in hive-gateway. */
export function listEnabledSignalAccounts(_cfg: unknown): string[] {
  return [];
}

export function resolveSignalAccount(_params: unknown): {
  config?: {
    allowFrom?: Array<string | number>;
    groupAllowFrom?: Array<string | number>;
    dmPolicy?: string;
    groupPolicy?: string;
  };
} {
  return {};
}
