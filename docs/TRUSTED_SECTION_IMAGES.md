# Trusted Section Images — BillReliefAI

Section: **"Trusted by Thousands · Real Savings, Real Relief"**

Images are **from the internet** (Unsplash), not AI-generated. Configured in `src/lib/trustedImages.ts`.

---

## Mapping (caption → concept)

| # | Caption          | Concept (from prompts)   | Source / alt |
|---|------------------|---------------------------|--------------|
| 1 | Expert review    | Female healthcare professional, trustworthy | Unsplash |
| 2 | Trusted care     | Medical office / hospital, professional setting | Unsplash |
| 3 | Accurate analysis| Medical document / data, precision | Unsplash |
| 4 | Secure handling  | Documents, clipboard, data protection | Unsplash |
| 5 | Clear savings    | Doctor–patient, financial benefit | Unsplash |
| 6 | Peace of mind    | Healthcare team, relief | Unsplash |
| 7 | Human + AI       | Medical paperwork, tech partnership | Unsplash |
| 8 | For your family  | Patient and caregiver, family care | Unsplash |
| 9 | Protected        | Medical professional, security | Unsplash |
| 10| Real results     | Healthcare and financial planning | Unsplash |

---

## Replacing with your own images

If you download or create images and save them in the repo (e.g. `public/images/trusted/`):

1. Save with these filenames (optional but consistent):
   - `image-01-expert-review.png`
   - `image-02-trusted-care.png`
   - `image-03-accurate-analysis.png`
   - `image-04-secure-handling.png`
   - `image-05-clear-savings.png`
   - `image-06-peace-of-mind.png`
   - `image-07-human-ai.png`
   - `image-08-for-your-family.png`
   - `image-09-protected.png`
   - `image-10-real-results.png`

2. In `src/lib/trustedImages.ts`, replace each `U("...", n)` URL with `/images/trusted/image-0n-....png` (or your path).

---

## Brand colors (for reference)

- Primary blue: `#0F4C81`
- Accent yellow: `#FDDA0D`
- Secondary blue: `#1e5a96`

---

*Prompts used for concept only; actual images are from Unsplash (internet).*
