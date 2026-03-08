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

export function looksLikeUuid(_value: string): boolean {
  return false;
}

export function resolveSignalPeerId(_sender: unknown): string {
  return "";
}

export function resolveSignalRecipient(_sender: unknown): string {
  return "";
}

export function resolveSignalSender(_params: {
  sourceUuid?: string | null;
  sourceNumber?: string | null;
}): string | undefined {
  return undefined;
}
