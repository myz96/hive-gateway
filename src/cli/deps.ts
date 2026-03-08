import type { OutboundSendDeps } from "../infra/outbound/deliver.js";
import type { sendMessageSlack } from "../slack/send.js";
import { createOutboundSendDepsFromCliSource } from "./outbound-send-mapping.js";

export type CliDeps = {
  sendMessageSlack: typeof sendMessageSlack;
};

let slackSenderRuntimePromise: Promise<typeof import("./deps-send-slack.runtime.js")> | null = null;

function loadSlackSenderRuntime() {
  slackSenderRuntimePromise ??= import("./deps-send-slack.runtime.js");
  return slackSenderRuntimePromise;
}

export function createDefaultDeps(): CliDeps {
  return {
    sendMessageSlack: async (...args) => {
      const { sendMessageSlack } = await loadSlackSenderRuntime();
      return await sendMessageSlack(...args);
    },
  };
}

export function createOutboundSendDeps(deps: CliDeps): OutboundSendDeps {
  return createOutboundSendDepsFromCliSource(deps as never);
}

/** Stub - web auth store not available in hive-gateway. */
export function logWebSelfId(): void {}
