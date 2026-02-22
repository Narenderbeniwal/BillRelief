# Tawk.to Live Chat – BillReliefAI

Human-first live chat is wired into the site via **Tawk.to** (free, HIPAA-safe: you control data, no PHI to third parties).

## Quick setup

1. **Env vars** (required for widget to load):
   ```env
   NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
   NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
   ```
   Get these: [tawk.to](https://www.tawk.to) → Administration → Overview (Property ID) and Chat Widget (Widget ID).

2. **Full setup:** Follow **`docs/TAWK_SETUP_CHECKLIST.md`** (account, widget, welcome/offline text, canned responses, triggers, mobile).

3. **Canned responses:** Copy-paste from **`docs/TAWK_CANNED_RESPONSES.md`** into the Tawk.to dashboard (shortcuts like `/pricing`, `/process`, etc.).

## Behavior

- **Widget:** Renders on all pages when both env vars are set; loads with `lazyOnload` so it doesn’t block the page.
- **Branding:** Bubble color is set to `#0F4C81` in code (Tawk_API.onLoad).
- **No PHI:** Keep chat for general questions; route “my bill…”, “my case…” to a human. Do not send bill details or PHI in chat.

## Phase 2 (optional)

- Use Tawk.to **Automation / Chatbot** for keyword-based auto-replies (e.g. “price” → pricing message).
- Keep specific/case-related questions for humans only.
