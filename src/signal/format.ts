/** Stub - Signal not supported in hive-gateway. */
export type SignalTextStyleRange = {
  start: number;
  length: number;
  style: string;
};

export function markdownToSignalTextChunks(
  _text: string,
  _maxLength?: number,
): Array<{ text: string; textStyles?: SignalTextStyleRange[] }> {
  return [{ text: _text }];
}
