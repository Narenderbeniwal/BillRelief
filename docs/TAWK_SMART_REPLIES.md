# How to Turn On Smart Replies in Tawk.to

*Updated: February 20, 2026*

---

## Quick Answer

**Tawk.to has 3 types of "smart replies":**
1. **Shortcuts** (Canned responses – manual trigger)
2. **Triggers** (Automated messages based on behavior)
3. **Chatbot** (Decision-tree automation)

---

## METHOD 1: SHORTCUTS (Canned Responses)

**Pre-written responses you send with one click.**

### Where to set up
**Administration** → **Shortcuts** → **+ Add Shortcut**

### Create these 10 shortcuts

| Trigger   | Name            | Use for                    |
|----------|-----------------|----------------------------|
| `/pricing` | Pricing Information | Cost, plans, fees          |
| `/howitworks` | How It Works   | Process, steps             |
| `/success` | Success Rate    | Guarantee, results         |
| `/bills`  | Bill Types      | What bills we handle       |
| `/security` | Security & HIPAA | Safe, privacy, HIPAA    |
| `/timeline` | Timeline       | How long it takes          |
| `/start`  | Get Started     | Upload, next step          |
| `/compare` | Vs Competitors | Comparison                 |
| `/collections` | Bills in Collections | Collections help    |
| `/contact` | Contact Human  | Talk to specialist         |

**Usage:** In an active chat, type the trigger (e.g. `/pricing`) and press Enter – the full message is sent.

---

### Shortcut #1: /pricing

**Trigger:** `/pricing`

**Message:**
```
Great question! We have 3 options:

🆓 **Free Bill Scan**
   • Upload bill, see potential savings
   • No credit card required
   • Takes 2 minutes

💎 **AI Analysis Pro - $99**
   • Full error report + negotiation templates
   • Best for: DIY negotiators
   • 30-day money-back guarantee

🔥 **Done-For-You - 25% of savings**
   • We handle everything
   • Only pay if we save you money
   • Average savings: $4,200

See all details: https://www.billreliefai.com/pricing

Which option interests you?
```

---

### Shortcut #2: /howitworks

**Trigger:** `/howitworks`

**Message:**
```
Our process is simple:

1️⃣ **Upload Your Bill** (2 min) – Secure, HIPAA-aligned upload
2️⃣ **AI Analysis** (48 hours) – Scans for errors & overcharges
3️⃣ **Expert Review** (24 hours) – Expert validates findings
4️⃣ **We Negotiate** (5–7 days) – We contact provider and handle everything

**Total time:** 7–10 days on average

Ready to start? https://www.billreliefai.com/get-started
```

---

### Shortcut #3: /success

**Trigger:** `/success`

**Message:**
```
Our results:

✅ **91% success rate**
✅ **$4,200 average savings** per patient
✅ **10,000+ patients** helped
✅ **$22M+ total saved**

**Guarantee:** No savings = no fee.

See case studies: https://www.billreliefai.com/case-studies

Want to see if we can help you?
```

---

### Shortcut #4: /bills

**Trigger:** `/bills`

**Message:**
```
We handle ALL types of medical bills:

✅ Hospital (ER, surgery, inpatient)
✅ Doctor / specialist bills
✅ Imaging (MRI, CT, X-ray)
✅ Lab bills
✅ Ambulance
✅ Therapy/rehab

**Minimum:** $500. **No maximum.**

What type of bill do you have?
```

---

### Shortcut #5: /security

**Trigger:** `/security`

**Message:**
```
Your data security matters:

🔒 HIPAA-aligned infrastructure
🛡️ 256-bit encryption
✅ Strict access controls
🔐 Never shared or sold

You can request deletion anytime.

More: https://www.billreliefai.com/hipaa

Feel safe uploading? https://www.billreliefai.com/get-started
```

---

### Shortcut #6: /timeline

**Trigger:** `/timeline`

**Message:**
```
Typical timeline:

📅 **Day 0:** You upload bill
🤖 **Day 1–2:** AI analysis (48-hour guarantee)
👨‍⚔️ **Day 3:** Expert review
📞 **Day 4–7:** We negotiate
✅ **Day 7–10:** Resolution (average)

48 hours vs. competitors' 3–8 months.

Start now: https://www.billreliefai.com/get-started
```

---

### Shortcut #7: /start

**Trigger:** `/start`

**Message:**
```
Here’s how to get started:

**Step 1:** Upload your bill (2 min)
👉 https://www.billreliefai.com/get-started

**You’ll need:** Photo or PDF of your bill, email address

**Next:** AI scans in 48 hours → we email your report → you decide.

No credit card. No commitment. I’m here if you have questions after uploading!
```

---

### Shortcut #8: /compare

**Trigger:** `/compare`

**Message:**
```
How we compare:

**Other services:** 3–8 months, $5K minimum, 30–35% fees, hospital only

**BillReliefAI:** 48-hour analysis, $500 minimum, 25% fee (capped), ALL medical bills

Details: https://www.billreliefai.com#difference

Questions about our approach?
```

---

### Shortcut #9: /collections

**Trigger:** `/collections`

**Message:**
```
Yes, we help with bills in collections.

We validate the debt, find errors, negotiate settlement (often 30–50% off), and can arrange payment plans.

**Success rate:** High for collections cases. Time-sensitive for credit.

Upload: https://www.billreliefai.com/get-started  
Urgent: contact@billreliefai.com
```

---

### Shortcut #10: /contact

**Trigger:** `/contact`

**Message:**
```
Options to connect:

📧 **Email (2-hour response):** contact@billreliefai.com
💬 **Stay in chat** – I’ll grab a specialist (2–5 min)
🆓 **Upload for analysis:** https://www.billreliefai.com/get-started

Which works best?
```

---

## METHOD 2: TRIGGERS (Automated Messages)

**Administration** → **Triggers** → **+ Add Trigger**

### Trigger 1: Pricing page (30+ seconds)

- **Conditions:** Current page URL contains `/pricing` AND Time on page > 30 seconds  
- **Action:** Send message  
- **Message:** “I see you’re looking at our pricing. Any questions about which option is best for you?”  
- **Delay:** 0 seconds  

### Trigger 2: Exit intent

- **Conditions:** Mouse towards close button OR (Time on site > 60 sec AND Pages visited > 2 AND Has not started chat)  
- **Message:** “Quick question before you go? Most people wonder about cost, success rate, or security – what can I help with?”  
- **Delay:** 0 seconds  

### Trigger 3: Return visitor

- **Conditions:** Number of visits > 1 AND Time since last visit > 1 day  
- **Message:** “Welcome back! Still thinking about reducing your bill? I’m here if you have questions. Free scan: https://www.billreliefai.com/get-started”  
- **Delay:** 10 seconds  

### Trigger 4: Engaged visitor

- **Conditions:** Pages visited > 3 AND Time on site > 120 seconds AND Has not started chat  
- **Message:** “Looks like you’re doing your research. Any questions I can answer? Common ones: how we compare, what’s the catch, how long it takes.”  
- **Delay:** 5 seconds  

---

## METHOD 3: CHATBOT (Decision tree)

**Administration** → **Automation** → **Chatbot**

- Enable chatbot for when agents are offline or busy.
- Use buttons: e.g. “Pricing”, “How it works”, “Success rate”, “Talk to specialist”, “Get started”.
- Map each button to the matching shortcut content or a “Connecting you to a specialist” message.
- Prefer human when available; use bot for routing and simple answers only.

---

## Where everything is

| What            | Path |
|-----------------|------|
| Shortcuts       | Administration → Shortcuts |
| Triggers        | Administration → Triggers |
| Chatbot         | Administration → Automation → Chatbot |
| Widget look     | Administration → Chat Widget → Appearance |
| Shortcut usage  | Reports → Shortcuts Report |

---

## Quick start (first 10 minutes)

1. **Administration** → **Shortcuts** → **+ Add Shortcut**
2. Create `/pricing` (name: Pricing, trigger: `/pricing`, message: use template above).
3. Create `/start` and `/howitworks` the same way.
4. **Administration** → **Triggers** → **+ Add Trigger** → Pricing page trigger (URL contains `/pricing`, time on page > 30 sec).
5. Test: open site in incognito, open chat, in dashboard reply with `/pricing` and confirm the full message sends.

---

## Tips

- End with a question or clear next step.
- Use emojis sparingly.
- Link to `/get-started` or `/pricing` where relevant.
- Use **Reports → Shortcuts Report** to see which shortcuts are used and optimize.

---

*See also: `TAWK_SETUP_CHECKLIST.md`, `TAWK_CANNED_RESPONSES.md`, `TAWK_CHAT.md`.*
