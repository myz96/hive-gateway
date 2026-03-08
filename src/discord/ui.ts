import { Container } from "@buape/carbon";

type DiscordContainerComponents = ConstructorParameters<typeof Container>[0];

const DEFAULT_DISCORD_ACCENT_COLOR = "#5865F2";

type DiscordUiContainerParams = {
  cfg?: unknown;
  accountId?: unknown;
  components: NonNullable<DiscordContainerComponents>;
};

/**
 * Stub DiscordUiContainer for hive-gateway.
 * Discord is not supported but the class is extended by channel-adapters.
 */
export class DiscordUiContainer extends Container {
  constructor(
    params: DiscordContainerComponents | DiscordUiContainerParams,
    _options?: { accentColor?: string },
  ) {
    const components =
      params && !Array.isArray(params) && "components" in params ? params.components : params;
    super(components);
    this.accentColor = parseInt(
      (_options?.accentColor ?? DEFAULT_DISCORD_ACCENT_COLOR).replace("#", ""),
      16,
    );
  }
}

export function normalizeDiscordAccentColor(raw?: string | null): string | null {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) {
    return null;
  }
  const normalized = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  if (!/^#[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }
  return normalized.toUpperCase();
}

export function resolveDiscordAccentColor(_params: {
  cfg: unknown;
  accountId?: string | null;
}): string {
  return DEFAULT_DISCORD_ACCENT_COLOR;
}
