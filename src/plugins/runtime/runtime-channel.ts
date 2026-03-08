import { resolveEffectiveMessagesConfig, resolveHumanDelayConfig } from "../../agents/identity.js";
import { handleSlackAction } from "../../agents/tools/slack-actions.js";
import {
  chunkByNewline,
  chunkMarkdownText,
  chunkMarkdownTextWithMode,
  chunkText,
  chunkTextWithMode,
  resolveChunkMode,
  resolveTextChunkLimit,
} from "../../auto-reply/chunk.js";
import {
  hasControlCommand,
  isControlCommandMessage,
  shouldComputeCommandAuthorized,
} from "../../auto-reply/command-detection.js";
import { shouldHandleTextCommands } from "../../auto-reply/commands-registry.js";
import { withReplyDispatcher } from "../../auto-reply/dispatch.js";
import {
  formatAgentEnvelope,
  formatInboundEnvelope,
  resolveEnvelopeFormatOptions,
} from "../../auto-reply/envelope.js";
import {
  createInboundDebouncer,
  resolveInboundDebounceMs,
} from "../../auto-reply/inbound-debounce.js";
import { dispatchReplyFromConfig } from "../../auto-reply/reply/dispatch-from-config.js";
import { finalizeInboundContext } from "../../auto-reply/reply/inbound-context.js";
import {
  buildMentionRegexes,
  matchesMentionPatterns,
  matchesMentionWithExplicit,
} from "../../auto-reply/reply/mentions.js";
import { dispatchReplyWithBufferedBlockDispatcher } from "../../auto-reply/reply/provider-dispatcher.js";
import { createReplyDispatcherWithTyping } from "../../auto-reply/reply/reply-dispatcher.js";
import { removeAckReactionAfterReply, shouldAckReaction } from "../../channels/ack-reactions.js";
import { resolveCommandAuthorizedFromAuthorizers } from "../../channels/command-gating.js";
import { discordMessageActions } from "../../channels/plugins/actions/discord.js";
import { signalMessageActions } from "../../channels/plugins/actions/signal.js";
import { telegramMessageActions } from "../../channels/plugins/actions/telegram.js";
import { recordInboundSession } from "../../channels/session.js";
import {
  resolveChannelGroupPolicy,
  resolveChannelGroupRequireMention,
} from "../../config/group-policy.js";
import { resolveMarkdownTableMode } from "../../config/markdown-tables.js";
import {
  readSessionUpdatedAt,
  recordSessionMetaFromInbound,
  resolveStorePath,
  updateLastRoute,
} from "../../config/sessions.js";
import { getChannelActivity, recordChannelActivity } from "../../infra/channel-activity.js";
import { convertMarkdownTables } from "../../markdown/tables.js";
import { fetchRemoteMedia } from "../../media/fetch.js";
import { saveMediaBuffer } from "../../media/store.js";
import { resolveAgentRoute } from "../../routing/resolve-route.js";
import {
  listSlackDirectoryGroupsLive,
  listSlackDirectoryPeersLive,
} from "../../slack/directory-live.js";
import { monitorSlackProvider } from "../../slack/index.js";
import { probeSlack } from "../../slack/probe.js";
import { resolveSlackChannelAllowlist } from "../../slack/resolve-channels.js";
import { resolveSlackUserAllowlist } from "../../slack/resolve-users.js";
import { sendMessageSlack } from "../../slack/send.js";
import type { PluginRuntime } from "./types.js";

// Stub functions for removed channels
const noop = () => {};
const noopProbe = () => Promise.resolve({ ok: false, error: "not supported in hive-gateway" });
const noopSend = (..._args: unknown[]) =>
  Promise.reject(new Error("channel not supported in hive-gateway"));
const noopAllowlist = () => [];

export function createRuntimeChannel(): PluginRuntime["channel"] {
  return {
    text: {
      chunkByNewline,
      chunkMarkdownText,
      chunkMarkdownTextWithMode,
      chunkText,
      chunkTextWithMode,
      resolveChunkMode,
      resolveTextChunkLimit,
      hasControlCommand,
      resolveMarkdownTableMode,
      convertMarkdownTables,
    },
    reply: {
      dispatchReplyWithBufferedBlockDispatcher,
      createReplyDispatcherWithTyping,
      resolveEffectiveMessagesConfig,
      resolveHumanDelayConfig,
      dispatchReplyFromConfig,
      withReplyDispatcher,
      finalizeInboundContext,
      formatAgentEnvelope,
      formatInboundEnvelope,
      resolveEnvelopeFormatOptions,
    },
    routing: {
      resolveAgentRoute,
    },
    pairing: {
      buildPairingReply: () => "",
      readAllowFromStore: () => Promise.resolve([]),
      upsertPairingRequest: () => Promise.resolve(),
    },
    media: {
      fetchRemoteMedia,
      saveMediaBuffer,
    },
    activity: {
      record: recordChannelActivity,
      get: getChannelActivity,
    },
    session: {
      resolveStorePath,
      readSessionUpdatedAt,
      recordSessionMetaFromInbound,
      recordInboundSession,
      updateLastRoute,
    },
    mentions: {
      buildMentionRegexes,
      matchesMentionPatterns,
      matchesMentionWithExplicit,
    },
    reactions: {
      shouldAckReaction,
      removeAckReactionAfterReply,
    },
    groups: {
      resolveGroupPolicy: resolveChannelGroupPolicy,
      resolveRequireMention: resolveChannelGroupRequireMention,
    },
    debounce: {
      createInboundDebouncer,
      resolveInboundDebounceMs,
    },
    commands: {
      resolveCommandAuthorizedFromAuthorizers,
      isControlCommandMessage,
      shouldComputeCommandAuthorized,
      shouldHandleTextCommands,
    },
    discord: {
      messageActions: discordMessageActions,
      resolveChannelAllowlist: noopAllowlist as never,
      resolveUserAllowlist: noopAllowlist as never,
      sendMessageDiscord: noopSend as never,
      sendPollDiscord: noopSend as never,
    },
    slack: {
      listDirectoryGroupsLive: listSlackDirectoryGroupsLive,
      listDirectoryPeersLive: listSlackDirectoryPeersLive,
      probeSlack,
      resolveChannelAllowlist: resolveSlackChannelAllowlist,
      resolveUserAllowlist: resolveSlackUserAllowlist,
      sendMessageSlack,
      monitorSlackProvider,
      handleSlackAction,
    },
    telegram: {
      messageActions: telegramMessageActions,
    },
    signal: {
      sendMessageSignal: noopSend as never,
      messageActions: signalMessageActions,
    },
    imessage: {} as never,
    whatsapp: {} as never,
    line: {
      listLineAccountIds: () => [],
      resolveDefaultLineAccountId: () => undefined,
      resolveLineAccount: () => undefined,
      normalizeAccountId: (id: string) => id,
      probeLineBot: noopProbe,
      sendMessageLine: noopSend,
      pushMessageLine: noopSend,
      pushMessagesLine: noopSend,
      pushFlexMessage: noopSend,
      pushTemplateMessage: noopSend,
      pushLocationMessage: noopSend,
      pushTextMessageWithQuickReplies: noopSend,
      createQuickReplyItems: () => [],
      buildTemplateMessageFromPayload: () => undefined,
      monitorLineProvider: noop,
    } as never,
  };
}
