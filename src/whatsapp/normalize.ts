/** Stub - WhatsApp not supported in hive-gateway. */
export function normalizeWhatsAppTarget(target: string): string {
  return target;
}

export function isWhatsAppGroupJid(_jid: string): boolean {
  return false;
}
