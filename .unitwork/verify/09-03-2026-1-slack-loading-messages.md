# Checkpoint 1: Add loading_messages to Slack Assistant Threads status

## Changes

- `src/slack/monitor/context.ts`: Added `loadingMessages?: string[]` to `setSlackThreadStatus` type + implementation. Maps to `loading_messages` in API payload via conditional spread.
- `src/slack/monitor/message-handler/dispatch.ts`: Added `DEFAULT_LOADING_MESSAGES` constant (10 phrases). Passed to `setSlackThreadStatus` in typing start callback. Changed status from "is typing..." to "is thinking...".

## AI-Verified

- [x] `loadingMessages` parameter added to type definition (context.ts:84)
- [x] `loadingMessages` parameter added to implementation (context.ts:256)
- [x] `loading_messages` conditionally spread into payload (context.ts:266-268) — only included when array is non-empty
- [x] `typeof payload` cast (context.ts:273) auto-picks up new field — no cast changes needed
- [x] `DEFAULT_LOADING_MESSAGES` constant defined with 10 phrases (dispatch.ts:30-41)
- [x] `loadingMessages` passed in start callback (dispatch.ts:164)
- [x] Stop callback unchanged — passes `status: ""` without loadingMessages, which correctly clears the status (dispatch.ts:177-178)
- [x] No other callers of `setSlackThreadStatus` need updating (only called from dispatch typing callbacks)

## Human QA Checklist

- [ ] Deploy to VPS or run locally with Slack connected
- [ ] Send a DM to the bot in Slack
- [ ] Observe rotating loading messages appear while bot processes
- [ ] Confirm "is thinking..." shows as the main status text
- [ ] Confirm status + loading messages clear when bot responds
- [ ] Confirm bot still works in channels with @mention (typingReaction fallback)
- [ ] Prerequisite: Slack app has "Agents & AI Apps" toggled on in api.slack.com settings

## Confidence: 90%

- -10%: Visual Slack behavior (rotation, clearing) can only be verified via human testing
