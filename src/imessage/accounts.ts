/** Stub - iMessage not supported in hive-gateway. */
export function listEnabledIMessageAccounts(_cfg: unknown): string[] {
  return [];
}

export function resolveIMessageAccount(_params: unknown): undefined {
  return undefined;
}

export function isIMessageEnabled(_cfg: unknown): boolean {
  return false;
}
