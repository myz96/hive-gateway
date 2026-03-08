# Slack Loading Messages for Assistant Threads Status

## Linear Ticket

- **Ticket ID:** None
- **URL:** N/A

## Target Repository

All changes are in the `hive-gateway` repo at `~/conductor/repos/hive-gateway/`, NOT the `hive` deployment repo.

## Purpose & Impact

- When a user messages the Hive bot in Slack, there's no feedback until the agent finishes processing
- Users don't know if the bot is alive or working
- The Slack Assistant Threads API supports `loading_messages` — a list of rotating funny phrases that Slack cycles through server-side while the bot is processing
- hive-gateway already calls `assistant.threads.setStatus` but only passes `status: "is typing..."` without `loading_messages`
- This feature adds the missing parameter so users see entertaining status updates while waiting

## Requirements

### Functional Requirements

- [ ] FR1: `setSlackThreadStatus` accepts and passes `loading_messages` to Slack API
- [ ] FR2: Default hardcoded loading messages are sent when typing indicator starts
- [ ] FR3: Status clears properly when bot responds (existing behavior, verify not broken)

### Non-Functional Requirements

- [ ] NFR1: No new config surface — hardcoded defaults only (configurable deferred)

### Out of Scope

- Configurable loading messages via `SlackAccountConfig` (future enhancement)
- `setSuggestedPrompts()` support (separate feature)
- `setTitle()` support (separate feature)
- `assistant_thread_started` / `assistant_thread_context_changed` event handling
- Non-threaded/non-DM contexts (existing `typingReaction` emoji covers those)

## Technical Approach

### Key Insight

The infrastructure is 95% built. `setSlackThreadStatus` in `context.ts` already calls `assistant.threads.setStatus`. The `@slack/web-api` v7.14.1 types already include `loading_messages?: string[]`. We just need to thread the parameter through.

### Files Affected

1. `src/slack/monitor/context.ts` — `setSlackThreadStatus` function signature + implementation
2. `src/slack/monitor/message-handler/dispatch.ts` — typing callbacks that invoke `setSlackThreadStatus`

### Implementation Note

The existing code at context.ts:265-272 casts `app.client` and uses `typeof payload` to infer the API call argument type. Adding `loading_messages` to the payload object will automatically flow through the cast — no changes needed to the cast block itself.

### Default Loading Messages

```typescript
const DEFAULT_LOADING_MESSAGES = [
  "Reticulating splines...",
  "Consulting the rubber duck...",
  "Rearranging ones and zeros...",
  "Asking the mass of silicon for advice...",
  "Compiling thoughts...",
  "Herding the electrons...",
  "Summoning the code spirits...",
  "Teaching the hamsters to type faster...",
  "Untangling the internet cables...",
  "Convincing the AI to stop overthinking...",
];
```

## Implementation Units

### Unit 1: Add loading_messages support to setSlackThreadStatus and wire up defaults

- **Changes:**
  1. `src/slack/monitor/context.ts`:
     - Add `loadingMessages?: string[]` to the `setSlackThreadStatus` params type (line 80-84)
     - Add `loading_messages: p.loadingMessages` to the payload object (line 259-264)
  2. `src/slack/monitor/message-handler/dispatch.ts`:
     - Add `DEFAULT_LOADING_MESSAGES` constant near top of file
     - In the typing `start` callback (line 147-151), pass `loadingMessages: DEFAULT_LOADING_MESSAGES` to `ctx.setSlackThreadStatus()`
     - The `stop` callback (line 164) passes `status: ""` which clears loading state — no changes needed there (Slack clears loading_messages when status is cleared)
- **Self-Verification:**
  - Read modified files to confirm parameter flows through
  - TypeScript compilation check: `npx tsc --noEmit` on affected files
  - Verify the stop callback still works (passes empty status, no loading_messages needed)
- **Human QA:**
  - [ ] Deploy to VPS (or run locally)
  - [ ] Send a message to the bot in Slack DM
  - [ ] Observe rotating loading messages appear while bot processes
  - [ ] Confirm messages clear when bot responds
  - [ ] Confirm non-threaded channel messages still work (typingReaction fallback)
- **Confidence Ceiling:** 90% — straightforward parameter threading, but can only verify the visual Slack behavior via human testing

## Verification Plan

### Agent Self-Verification

- TypeScript compilation of modified files
- Code review: confirm `loading_messages` flows from dispatch → context → Slack API call
- Confirm no regressions: stop callback still clears status

### Human QA Checklist

- [ ] Send DM to bot in Slack → see rotating loading messages
- [ ] Verify messages rotate (not static) — Slack handles this server-side
- [ ] Verify status clears when bot responds
- [ ] Verify bot still works in channels with @mention (typingReaction fallback)
- [ ] Check Slack app has "Agents & AI Apps" toggled on (prerequisite)

## Spec Changelog

- 08-03-2026: Initial spec from interview
