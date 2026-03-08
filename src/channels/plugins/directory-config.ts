import type { OpenClawConfig } from "../../config/types.js";
import { inspectSlackAccount } from "../../slack/account-inspect.js";
import { normalizeSlackMessagingTarget } from "./normalize/slack.js";
import type { ChannelDirectoryEntry } from "./types.js";

export type DirectoryConfigParams = {
  cfg: OpenClawConfig;
  accountId?: string | null;
  query?: string | null;
  limit?: number | null;
};

function addAllowFromAndDmsIds(
  ids: Set<string>,
  allowFrom: readonly unknown[] | undefined,
  dms: Record<string, unknown> | undefined,
) {
  for (const entry of allowFrom ?? []) {
    const raw = String(entry).trim();
    if (!raw || raw === "*") {
      continue;
    }
    ids.add(raw);
  }
  addTrimmedEntries(ids, Object.keys(dms ?? {}));
}

function addTrimmedId(ids: Set<string>, value: unknown) {
  const trimmed = String(value).trim();
  if (trimmed) {
    ids.add(trimmed);
  }
}

function addTrimmedEntries(ids: Set<string>, values: Iterable<unknown>) {
  for (const value of values) {
    addTrimmedId(ids, value);
  }
}

function normalizeTrimmedSet(
  ids: Set<string>,
  normalize: (raw: string) => string | null,
): string[] {
  return Array.from(ids)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => normalize(raw))
    .filter((id): id is string => Boolean(id));
}

function resolveDirectoryQuery(query?: string | null): string {
  return query?.trim().toLowerCase() || "";
}

function resolveDirectoryLimit(limit?: number | null): number | undefined {
  return typeof limit === "number" && limit > 0 ? limit : undefined;
}

function applyDirectoryQueryAndLimit(ids: string[], params: DirectoryConfigParams): string[] {
  const q = resolveDirectoryQuery(params.query);
  const limit = resolveDirectoryLimit(params.limit);
  const filtered = ids.filter((id) => (q ? id.toLowerCase().includes(q) : true));
  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

function toDirectoryEntries(kind: "user" | "group", ids: string[]): ChannelDirectoryEntry[] {
  return ids.map((id) => ({ kind, id }) as const);
}

export async function listSlackDirectoryPeersFromConfig(
  params: DirectoryConfigParams,
): Promise<ChannelDirectoryEntry[]> {
  const account = inspectSlackAccount({ cfg: params.cfg, accountId: params.accountId });
  const ids = new Set<string>();

  addAllowFromAndDmsIds(ids, account.config.allowFrom ?? account.dm?.allowFrom, account.config.dms);
  for (const channel of Object.values(account.config.channels ?? {})) {
    addTrimmedEntries(ids, channel.users ?? []);
  }

  const normalizedIds = normalizeTrimmedSet(ids, (raw) => {
    const mention = raw.match(/^<@([A-Z0-9]+)>$/i);
    const normalizedUserId = (mention?.[1] ?? raw).replace(/^(slack|user):/i, "").trim();
    if (!normalizedUserId) {
      return null;
    }
    const target = `user:${normalizedUserId}`;
    return normalizeSlackMessagingTarget(target) ?? target.toLowerCase();
  }).filter((id) => id.startsWith("user:"));
  return toDirectoryEntries("user", applyDirectoryQueryAndLimit(normalizedIds, params));
}

export async function listSlackDirectoryGroupsFromConfig(
  params: DirectoryConfigParams,
): Promise<ChannelDirectoryEntry[]> {
  const account = inspectSlackAccount({ cfg: params.cfg, accountId: params.accountId });
  const ids = Object.keys(account.config.channels ?? {})
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => normalizeSlackMessagingTarget(raw) ?? raw.toLowerCase())
    .filter((id) => id.startsWith("channel:"));
  return toDirectoryEntries("group", applyDirectoryQueryAndLimit(ids, params));
}
