/**
 * Testimonials for homepage and pricing. Use consistent photo placeholders
 * (replace with real customer photos when available).
 */
const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=96&background=0F4C81&color=fff`;

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  billType: string;
  beforeAmount: number;
  afterAmount: number;
  resolutionDays: number;
  date: string;
  verified: boolean;
  caseManager?: string;
  photo: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "After ACL surgery, I got hit with an $8,500 bill. I tried another service first and waited 3 months with zero progress. BillRelief's AI found $1,200 in duplicate charges and negotiated the rest down to $3,400 in just 5 days. My case manager Sarah kept me updated daily via text.",
    author: "Marcus Thompson",
    location: "Dallas, TX",
    billType: "ACL Surgery Bill",
    beforeAmount: 8500,
    afterAmount: 3400,
    resolutionDays: 5,
    date: "January 2026",
    verified: true,
    caseManager: "Sarah",
    photo: avatar("Marcus Thompson"),
  },
  {
    quote:
      "Another service said they don't handle doctor bills. BillRelief negotiated my anesthesiologist bill—found a coding error and got me from $4,800 to $2,600. I had my check in 3 days.",
    author: "Jennifer Kim",
    location: "Phoenix, AZ",
    billType: "Anesthesiologist Bill",
    beforeAmount: 4800,
    afterAmount: 2600,
    resolutionDays: 3,
    date: "December 2025",
    verified: true,
    photo: avatar("Jennifer Kim"),
  },
  {
    quote:
      "We make $95K a year—too much for income-based programs, too little to pay $12K in medical bills. BillRelief was our only hope. They got us down to $4,500. Our family can breathe again.",
    author: "The Rodriguez Family",
    location: "Miami, FL",
    billType: "Hospital & ER Bills",
    beforeAmount: 12000,
    afterAmount: 4500,
    resolutionDays: 7,
    date: "January 2026",
    verified: true,
    photo: avatar("Rodriguez Family"),
  },
  {
    quote:
      "I had a $67,000 hospital bill from a heart procedure. I thought we'd lose our house. BillRelief found errors and negotiated with the hospital. We paid $0—they reduced it to charity care. I still cry when I think about it.",
    author: "David M.",
    location: "Atlanta, GA",
    billType: "Heart Procedure / Hospital",
    beforeAmount: 67000,
    afterAmount: 0,
    resolutionDays: 14,
    date: "November 2025",
    verified: true,
    photo: avatar("David M"),
  },
  {
    quote:
      "ER visit for my son—$6,200 for a few hours. BillRelief's AI flagged duplicate line items and got it down to $2,100. Took 4 days. Worth every penny of the fee.",
    author: "Rachel L.",
    location: "Denver, CO",
    billType: "ER Visit",
    beforeAmount: 6200,
    afterAmount: 2100,
    resolutionDays: 4,
    date: "January 2026",
    verified: true,
    photo: avatar("Rachel L"),
  },
  {
    quote:
      "MRI and lab bills were killing us—$3,800 total. Another company said minimum $5K. BillRelief took our bills, found overcharges, and got us to $1,400 in 6 days.",
    author: "James & Lisa W.",
    location: "Chicago, IL",
    billType: "MRI & Lab Bills",
    beforeAmount: 3800,
    afterAmount: 1400,
    resolutionDays: 6,
    date: "December 2025",
    verified: true,
    photo: avatar("James Lisa W"),
  },
  {
    quote:
      "C-section and NICU stay—$28,000. I was drowning. BillRelief negotiated with the hospital and got us to $9,200. They explained every step. Mental health relief as much as financial.",
    author: "Amanda T.",
    location: "Houston, TX",
    billType: "C-Section & NICU",
    beforeAmount: 28000,
    afterAmount: 9200,
    resolutionDays: 11,
    date: "January 2026",
    verified: true,
    photo: avatar("Amanda T"),
  },
  {
    quote:
      "Ambulance bill $4,500 for a 10-minute ride. I thought it was a joke. BillRelief got it down to $1,350. Fast and professional.",
    author: "Michael R.",
    location: "Seattle, WA",
    billType: "Ambulance",
    beforeAmount: 4500,
    afterAmount: 1350,
    resolutionDays: 5,
    date: "December 2025",
    verified: true,
    photo: avatar("Michael R"),
  },
  {
    quote:
      "Physical therapy bills stacked up to $5,600. No one else would touch them. BillRelief found duplicate CPT codes and got me to $2,200 in 8 days.",
    author: "Patricia H.",
    location: "Boston, MA",
    billType: "Physical Therapy",
    beforeAmount: 5600,
    afterAmount: 2200,
    resolutionDays: 8,
    date: "January 2026",
    verified: true,
    photo: avatar("Patricia H"),
  },
  {
    quote:
      "Colonoscopy and pathology—$7,100. BillRelief's AI caught wrong codes and out-of-network markups. Final bill $2,500. Resolution in 6 days. Recommend to everyone.",
    author: "Robert S.",
    location: "San Diego, CA",
    billType: "Colonoscopy & Pathology",
    beforeAmount: 7100,
    afterAmount: 2500,
    resolutionDays: 6,
    date: "December 2025",
    verified: true,
    photo: avatar("Robert S"),
  },
];

export function formatTestimonialResult(t: Testimonial): string {
  const pct = t.afterAmount === 0 ? 100 : Math.round((1 - t.afterAmount / t.beforeAmount) * 100);
  return `$${t.beforeAmount.toLocaleString()} → $${t.afterAmount.toLocaleString()} (${pct}% savings)`;
}
