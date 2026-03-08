/** Stub - Canvas host not supported in hive-gateway. */
import type { IncomingMessage, ServerResponse } from "node:http";

export const A2UI_PATH = "/__a2ui";
export const CANVAS_HOST_PATH = "/__canvas";
export const CANVAS_WS_PATH = "/__canvas/ws";

export function handleA2uiHttpRequest(_req: IncomingMessage, _res: ServerResponse): void {
  _res.writeHead(404);
  _res.end("Canvas host not supported");
}
