/** Stub - Discord not supported in hive-gateway. */
export const DISCORD_TIMEOUT_DEFAULTS = {
  MIN: 0,
  MAX: 0,
  DEFAULT: 0,
};

export function resolveDiscordTimeoutDefaults(): typeof DISCORD_TIMEOUT_DEFAULTS {
  return DISCORD_TIMEOUT_DEFAULTS;
}
