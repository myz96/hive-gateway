/** Stub - iMessage not supported in hive-gateway. */

type IMessageTarget =
  | { kind: "handle"; to: string }
  | { kind: "chat_id"; chatId: number }
  | { kind: "chat_guid"; chatGuid: string }
  | { kind: "chat_identifier"; chatIdentifier: string };

export function parseIMessageTarget(_target: string): IMessageTarget {
  return { kind: "handle", to: _target };
}

export function normalizeIMessageHandle(handle: string): string {
  return handle;
}
