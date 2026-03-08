// Web/WhatsApp channel is not supported in hive-gateway.
// This barrel module is stubbed out.

export const DEFAULT_WEB_MEDIA_BYTES = 16 * 1024 * 1024;
export const HEARTBEAT_PROMPT = "";
export const HEARTBEAT_TOKEN = "HEARTBEAT_OK";

export function monitorWebChannel(): void {}
export function resolveHeartbeatRecipients(): string[] {
  return [];
}
export function runWebHeartbeatOnce(): Promise<void> {
  return Promise.resolve();
}
export type WebChannelStatus = "disconnected";
export type WebMonitorTuning = Record<string, never>;

export function extractMediaPlaceholder(): string | undefined {
  return undefined;
}
export function extractText(): string {
  return "";
}
export function monitorWebInbox(): void {}
export type WebInboundMessage = Record<string, never>;
export type WebListenerCloseReason = string;

export function loginWeb(): Promise<void> {
  return Promise.resolve();
}

export function loadWebMedia(): Promise<Buffer | undefined> {
  return Promise.resolve(undefined);
}
export function optimizeImageToJpeg(): Promise<Buffer> {
  return Promise.reject(new Error("web media not supported in hive-gateway"));
}

export function sendMessageWhatsApp(): Promise<void> {
  return Promise.reject(new Error("WhatsApp not supported in hive-gateway"));
}

export function createWaSocket(): never {
  throw new Error("WhatsApp not supported in hive-gateway");
}
export function formatError(err: unknown): string {
  return String(err);
}
export function getStatusCode(): number {
  return 0;
}
export function logoutWeb(): Promise<void> {
  return Promise.resolve();
}
export function logWebSelfId(): void {}
export function pickWebChannel(): string {
  return "";
}
export const WA_WEB_AUTH_DIR = "";
export function waitForWaConnection(): Promise<void> {
  return Promise.resolve();
}
export function webAuthExists(): boolean {
  return false;
}
