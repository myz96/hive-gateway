/** Stub - Discord not supported in hive-gateway. */
export function unbindThreadBindingsBySessionKey(_sessionKey: string): void {}

export function getThreadBinding(_params: unknown): undefined {
  return undefined;
}

type ThreadBinding = {
  boundBy?: string;
  targetSessionKey: string;
};

export function getThreadBindingManager(_accountId?: string | null):
  | {
      getByThreadId: (_threadId: string) => ThreadBinding | undefined;
      getIdleTimeoutMs: () => number;
      getMaxAgeMs: () => number;
    }
  | undefined {
  return undefined;
}

export function formatThreadBindingDurationLabel(_ms: number): string {
  return "";
}

export function resolveThreadBindingIdleTimeoutMs(_params: unknown): number {
  return 0;
}

export function resolveThreadBindingInactivityExpiresAt(_params: unknown): number | undefined {
  return undefined;
}

export function resolveThreadBindingMaxAgeExpiresAt(_params: unknown): number | undefined {
  return undefined;
}

export function resolveThreadBindingMaxAgeMs(_params: unknown): number {
  return 0;
}

export function setThreadBindingIdleTimeoutBySessionKey(_params: {
  targetSessionKey: string;
  accountId?: string;
  idleTimeoutMs: number;
}): Array<{ boundAt: number; lastActivityAt: number }> {
  return [];
}

export function setThreadBindingMaxAgeBySessionKey(_params: {
  targetSessionKey: string;
  accountId?: string;
  maxAgeMs: number;
}): Array<{ boundAt: number; lastActivityAt: number }> {
  return [];
}
