/** Stub - Telegram not supported in hive-gateway. */
export function unbindTelegramThreadBindingsBySessionKey(_sessionKey: string): void {}

export function getTelegramThreadBinding(_params: unknown): undefined {
  return undefined;
}

export function setTelegramThreadBindingIdleTimeoutBySessionKey(_params: {
  targetSessionKey: string;
  accountId?: string;
  idleTimeoutMs: number;
}): Array<{ boundAt: number; lastActivityAt: number }> {
  return [];
}

export function setTelegramThreadBindingMaxAgeBySessionKey(_params: {
  targetSessionKey: string;
  accountId?: string;
  maxAgeMs: number;
}): Array<{ boundAt: number; lastActivityAt: number }> {
  return [];
}
