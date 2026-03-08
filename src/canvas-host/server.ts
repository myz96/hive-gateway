/** Stub - Canvas host not supported in hive-gateway. */
export type CanvasHostHandler = {
  close: () => void;
};

export type CanvasHostServer = {
  handler: CanvasHostHandler;
};

export function createCanvasHostHandler(): CanvasHostHandler {
  return {
    close: () => {},
  };
}
