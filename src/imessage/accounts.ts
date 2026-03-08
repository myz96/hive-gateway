/** Stub - iMessage not supported in hive-gateway. */
export function listEnabledIMessageAccounts(_cfg: unknown): string[] {
  return [];
}

export function resolveIMessageAccount(_params: unknown): {
  config?: {
    allowFrom?: Array<string | number>;
    groupAllowFrom?: Array<string | number>;
    dmPolicy?: string;
    groupPolicy?: string;
  };
} {
  return {};
}

export function isIMessageEnabled(_cfg: unknown): boolean {
  return false;
}
