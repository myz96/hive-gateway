import type { OpenClawConfig } from "../config/config.js";

export const OPENAI_TTS_MODELS = ["tts-1", "tts-1-hd"] as const;
export const OPENAI_TTS_VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"] as const;

/**
 * TTS is not supported in hive-gateway.
 */
export function buildTtsSystemPromptHint(_config: OpenClawConfig): string | undefined {
  return undefined;
}

export function textToSpeech(
  _text: string,
  _config: OpenClawConfig,
): Promise<{ filePath: string; format: string } | undefined> {
  return Promise.resolve(undefined);
}

export function textToSpeechTelephony(
  _text: string,
  _config: OpenClawConfig,
): Promise<{ filePath: string; format: string } | undefined> {
  return Promise.resolve(undefined);
}
