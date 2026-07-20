# EncycloBot — Bot specification

**Archetype:** content

**Voice:** professional and concise — write every user-facing message, button label, error, and empty state in this voice.

EncycloBot is a Telegram informational bot that provides concise, factual answers to general encyclopedia-style questions in Russian (and optionally English). It offers source attribution and simple follow-up navigation for users seeking quick, reliable information without conversational small talk.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- General public (age 13+) seeking quick encyclopedic information
- Students, curious users, and people needing fast fact-checks

## Success criteria

- Users receive accurate, concise answers with source attribution
- Users can navigate follow-up actions (more details, sources, translation, new question) seamlessly
- Bot maintains session context for limited follow-up questions

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open the main menu with greeting and usage examples
- **New question** (button, actor: user, callback: question:new) — Reset session and prompt for a new question
- **More details** (button, actor: user, callback: answer:expand) — Expand the current answer into a longer explanation
- **Sources** (button, actor: user, callback: sources:view) — View full citations/URLs used for the current answer
- **Translate** (button, actor: user, callback: translate:toggle) — Toggle translation of the current answer between Russian and English
- **/delete_data** (command, actor: user, command: /delete_data) — Clear stored session history and email (if provided)

## Flows

### Onboarding
_Trigger:_ /start

1. Display greeting and usage examples
2. Prompt user to ask any question

_Data touched:_ User

### Ask a question
_Trigger:_ User message or button press

1. Receive user question
2. Generate concise encyclopedic answer
3. Attach source attributions
4. Display follow-up buttons

_Data touched:_ Question, Answer, Source, Session

### Expand answer
_Trigger:_ answer:expand

1. Generate longer explanation with headings
2. Add additional sources
3. Maintain current context

_Data touched:_ Answer, Source

### View sources
_Trigger:_ sources:view

1. List full citations/URLs
2. Maintain current context

_Data touched:_ Source

### Translate answer
_Trigger:_ translate:toggle

1. Detect current language
2. Translate answer to alternate language
3. Maintain source attributions
4. Maintain current context

_Data touched:_ Answer, Language

### Error handling
_Trigger:_ Unanswerable question

1. Display error message with suggested examples
2. Maintain current context

_Data touched:_ Question

### Delete user data
_Trigger:_ /delete_data

1. Clear session history
2. Delete stored email (if any)

_Data touched:_ User

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **User** _(retention: persistent)_ — Telegram account interacting with the bot
  - fields: Telegram user id, Language preference, Timestamp of last interaction, Stored email (optional)
- **Question** _(retention: session)_ — User's natural-language query
  - fields: Text, Language, Timestamp
- **Answer** _(retention: session)_ — Concise encyclopedic response text
  - fields: Summary text, Expanded text, Language, Timestamp
- **Source** _(retention: session)_ — Citations used for the answer
  - fields: URL or reference, Description, Timestamp
- **Session** _(retention: session)_ — Recent history of user questions and answers for context
  - fields: Last 3 question/answer pairs, Language preference, Timestamp of last interaction

## Integrations

- **Telegram** (required) — Bot API messaging
- **Email service (optional)** (optional) — Send answers and sources to user's email
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- Enable/disable email sharing feature
- Set maximum session history length
- Configure source citation format
- Set language detection rules

## Permissions & privacy

- Minimal data retention (session history only)
- Email collection only with explicit opt-in
- /delete_data command to clear personal data
- No proactive notifications

## Edge cases

- Questions with ambiguous context requiring previous session data
- Requests for translation when no sources are available
- Multiple simultaneous sessions from the same user
- Requests for sources when none were provided

## Required tests

- Verify answer accuracy with source attribution
- Test follow-up navigation buttons work correctly
- Validate session context preservation for follow-up questions
- Test /delete_data command clears all stored data
- Validate error handling for unanswerable questions

## Assumptions

- Default language is Russian
- Answer style is concise 2-3 sentence summary
- Sources include up to 3 web citations per answer
- Session length keeps last 3 exchanges
- Email sharing is disabled by default
- No payment flows are implemented
- Privacy controls include minimal data retention and /delete_data command
