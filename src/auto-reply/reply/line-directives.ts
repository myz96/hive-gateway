import type { ReplyPayload } from "../types.js";

/**
 * LINE directives are not supported in this build.
 * Returns the payload unchanged.
 */
export function parseLineDirectives(payload: ReplyPayload): ReplyPayload {
  return payload;
}

/**
 * Check if text contains any LINE directives
 */
export function hasLineDirectives(_text: string): boolean {
  return false;
}
