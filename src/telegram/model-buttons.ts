/** Stub - Telegram not supported in hive-gateway. */
export function buildTelegramModelButtons(_params: unknown): undefined {
  return undefined;
}

export function resolveTelegramModelButtonsEnabled(_params: unknown): boolean {
  return false;
}

export function buildBrowseProvidersButton(): undefined {
  return undefined;
}

export type ProviderInfo = {
  id: string;
  count: number;
};

export function buildModelsKeyboard(_params: unknown): undefined {
  return undefined;
}

export function buildProviderKeyboard(_params: unknown): undefined {
  return undefined;
}

export function calculateTotalPages(_total: number, _pageSize: number): number {
  return 1;
}

export function getModelsPageSize(): number {
  return 10;
}
