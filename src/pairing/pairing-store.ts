/** Stub - Pairing not supported in hive-gateway. */
import type { ChannelId } from "../channels/plugins/types.js";

export async function readChannelAllowFromStore(
  _channel: ChannelId,
  _env: NodeJS.ProcessEnv,
  _accountId?: string,
): Promise<string[]> {
  return [];
}

export function readChannelAllowFromStoreSync(
  _channel: ChannelId,
  _env: NodeJS.ProcessEnv,
  _accountId?: string,
): string[] {
  return [];
}

export async function upsertChannelPairingRequest(_params: {
  channel: ChannelId;
  id: string;
  accountId?: string;
  meta?: Record<string, string>;
  env?: NodeJS.ProcessEnv;
  pairingAdapter?: unknown;
}): Promise<void> {}

export type PairingRequest = {
  id: string;
  code: string;
  createdAt: string;
  lastSeenAt: string;
  meta?: Record<string, string>;
};

export async function addChannelAllowFromStoreEntry(_params: {
  channel: ChannelId;
  entry: string;
  accountId?: string;
}): Promise<void> {}

export async function removeChannelAllowFromStoreEntry(_params: {
  channel: ChannelId;
  entry: string;
  accountId?: string;
}): Promise<void> {}

export async function approveChannelPairingCode(_params: {
  channel: ChannelId;
  code: string;
  accountId?: string;
}): Promise<boolean> {
  return false;
}

export async function listChannelPairingRequests(_params: {
  channel: ChannelId;
  accountId?: string;
}): Promise<PairingRequest[]> {
  return [];
}
