/** Stub - Signal not supported in hive-gateway. */
export function resolveSignalAccountId(_config: unknown): string | undefined {
  return undefined;
}

export function resolveSignalRecipientType(_target: string): "individual" | "group" {
  return "individual";
}

export function normalizeSignalTarget(target: string): string {
  return target;
}

export function isSignalGroupTarget(_target: string): boolean {
  return false;
}
