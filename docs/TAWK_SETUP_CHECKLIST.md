# Tawk.to Setup Checklist – BillReliefAI

Follow this to go live with human-first, HIPAA-safe chat in about 1 hour.

---

## Part 1: Account & Widget (≈15 min)

### 1. Create account
- [ ] Go to [tawk.to](https://www.tawk.to) → Sign up free
- [ ] Use e.g. `contact@billreliefai.com`
- [ ] Confirm email

### 2. Create property
- [ ] Property name: **BillReliefAI**
- [ ] Website URL: **https://www.billreliefai.com**
- [ ] Category: Business Services

### 3. Get embed IDs
- [ ] **Administration** → **Overview** → copy **Property ID**
- [ ] **Administration** → **Chat Widget** → copy **Widget ID**

### 4. Add to site
- [ ] In project root, create or edit `.env.local`:
  ```env
  NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
  NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
  ```
- [ ] Restart dev server; widget should appear (bubble bottom-right)

---

## Part 2: Customize widget (≈10 min)

In Tawk.to dashboard → **Administration** → **Chat Widget**:

- [ ] **Widget color:** `#0F4C81` (or set in Appearance; code also sets this on load)
- [ ] **Position:** Bottom right
- [ ] **Greeting (welcome):** Use text from `docs/TAWK_CANNED_RESPONSES.md` → “Welcome message”
- [ ] **Offline message:** Use text from same doc → “Offline message”
- [ ] **Pre-chat form (optional):** Name (optional), Email (required), Question (optional)

---

## Part 3: Canned responses (≈30 min)

- [ ] In Tawk.to: **Canned Responses** (or **Shortcuts**)
- [ ] Create each response from `docs/TAWK_CANNED_RESPONSES.md` (Pricing, Process, Guarantee, Bill types, Security, Timeline, Human handoff, Objections)
- [ ] Assign shortcuts: `/pricing`, `/process`, `/guarantee`, `/billtypes`, `/security`, `/timeline`, `/human`, `/objection-fee`, `/objection-diy`, `/objection-trust`

---

## Part 4: Triggers (optional, ≈15 min)

In **Automation** → **Triggers**:

### Trigger 1: Pricing page (30+ seconds)
- **Condition:** Page URL contains `/pricing` AND time on page > 30 sec  
- **Action:** Send message  
- **Message:** “Seeing anything you’d like to ask about? I can explain our options.”

### Trigger 2: Exit intent
- **Condition:** Mouse leaves viewport (top)  
- **Action:** Send message  
- **Message:** “Before you go—any quick question I can answer?”

### Trigger 3: Return visitor
- **Condition:** Visitor has been here before, no chat started  
- **Action:** Send message  
- **Message:** “Welcome back. Ready to try a free bill analysis or have a question?”

---

## Part 5: Mobile & team (≈5 min)

- [ ] Download **Tawk.to** app (iOS/Android)
- [ ] Log in, enable notifications
- [ ] (Optional) Add team members and roles

---

## Go-live checklist

- [ ] Widget shows on site (with env vars set)
- [ ] Welcome and offline messages set
- [ ] At least 5 canned responses added
- [ ] Mobile app installed and tested
- [ ] One test conversation (you → yourself)

---

## After launch

- [ ] Check first 24 hours; refine responses from real questions
- [ ] Add more canned responses for recurring topics
- [ ] Aim to reply within 5–15 minutes (or set clear “back in X hours”)
- [ ] Later: consider Tawk.to **Chatbot/Triggers** for simple keyword auto-replies (still no PHI, human for specific cases)

---

## Rules (HIPAA-safe)

- **Do** answer: pricing, process, timeline, security, types of bills, general FAQs
- **Do** hand off to human: “my bill is $X”, “my case”, “specific question about my situation”
- **Don’t** ask for or discuss specific bill amounts, provider names, or medical details in chat
- **Don’t** use a third-party AI (e.g. OpenAI) in chat until you have a BAA and a clear no-PHI flow
