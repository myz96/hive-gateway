/** Stub - WhatsApp/Web not supported in hive-gateway. */
export function hasAnyWhatsAppAuth(_cfg: unknown): boolean {
  return false;
}

export function resolveWhatsAppAccount(_params: unknown): {
  allowFrom?: string[];
  groupAllowFrom?: string[];
  dmPolicy?: string;
  groupPolicy?: string;
} {
  return {};
}

export function listEnabledWhatsAppAccounts(_cfg: unknown): string[] {
  return [];
}
