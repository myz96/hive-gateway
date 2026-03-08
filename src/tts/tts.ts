import type { ReplyPayload } from "../auto-reply/types.js";
import type { OpenClawConfig } from "../config/config.js";
import type { TtsAutoMode } from "../config/types.tts.js";

export const OPENAI_TTS_MODELS = ["tts-1", "tts-1-hd"] as const;
export const OPENAI_TTS_VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"] as const;

export type TtsResult = {
  success: boolean;
  audioPath?: string;
  provider?: string;
  latencyMs?: number;
  voiceCompatible?: boolean;
  error?: string;
};

export type TtsAttempt = {
  timestamp: number;
  success: boolean;
  textLength: number;
  summarized: boolean;
  provider?: string;
  latencyMs?: number;
  error?: string;
};

/**
 * TTS is not supported in hive-gateway.
 */
export function buildTtsSystemPromptHint(_config: OpenClawConfig): string | undefined {
  return undefined;
}

export function textToSpeech(_params: {
  text: string;
  cfg: OpenClawConfig;
  channel?: string;
  prefsPath?: string;
}): Promise<TtsResult> {
  return Promise.resolve({ success: false, error: "TTS not supported in hive-gateway" });
}

export function textToSpeechTelephony(
  _text: string,
  _config: OpenClawConfig,
): Promise<{ filePath: string; format: string } | undefined> {
  return Promise.resolve(undefined);
}

export function resolveTtsPrefsPath(_config: unknown): string {
  return "";
}

export function resolveTtsConfig(
  _config: OpenClawConfig,
): Record<string, unknown> & { mode?: string } {
  return {};
}

export function resolveTtsAutoMode(_params: {
  config: unknown;
  prefsPath?: string;
  sessionAuto?: TtsAutoMode;
}): TtsAutoMode {
  return "off";
}

export function normalizeTtsAutoMode(_mode: unknown): TtsAutoMode {
  return "off";
}

export function resolveTtsApiKey(_config: unknown, _provider?: string): string | undefined {
  return undefined;
}

export function resolveTtsProviderOrder(_config: unknown): string[] {
  return [];
}

export function getTtsProvider(_config: unknown, _prefsPath?: string): string | undefined {
  return undefined;
}

export function getTtsMaxLength(_prefsPath: string): number {
  return 0;
}

export function isTtsEnabled(_config: unknown, _prefsPath?: string): boolean {
  return false;
}

export function isTtsProviderConfigured(_config: unknown, _provider?: string | null): boolean {
  return false;
}

export function isSummarizationEnabled(_prefsPath: string): boolean {
  return false;
}

export function setTtsEnabled(_prefsPath: string, _enabled: boolean): void {}

export function setTtsProvider(_prefsPath: string, _provider: string): void {}

export function setTtsMaxLength(_prefsPath: string, _length: number): void {}

export function setSummarizationEnabled(_prefsPath: string, _enabled: boolean): void {}

export function setLastTtsAttempt(_attempt: TtsAttempt): void {}

export function getLastTtsAttempt(): TtsAttempt | undefined {
  return undefined;
}

export function maybeApplyTtsToPayload(_params: {
  payload: ReplyPayload;
  cfg: OpenClawConfig;
  channel?: string;
  kind?: string;
  inboundAudio?: boolean;
  ttsAuto?: TtsAutoMode;
}): Promise<ReplyPayload> {
  return Promise.resolve(_params.payload);
}
