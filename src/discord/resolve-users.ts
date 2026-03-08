/** Stub - Discord not supported in hive-gateway. */
export async function resolveDiscordUserAllowlist(_params: {
  token: string;
  entries: string[];
}): Promise<Array<{ input: string; resolved: boolean; name?: string | null }>> {
  return [];
}
