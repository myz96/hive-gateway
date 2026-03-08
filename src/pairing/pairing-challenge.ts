/** Stub - Pairing not supported in hive-gateway. */
export async function issuePairingChallenge(
  _params: unknown,
): Promise<{ code: string; message: string } | undefined> {
  return undefined;
}
