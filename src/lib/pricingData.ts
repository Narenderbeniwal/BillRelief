export type TierId = "free" | "ai-pro" | "expert" | "done-for-you";

export interface PricingTier {
  id: TierId;
  name: string;
  tagline: string;
  badge?: string;
  badgeStyle?: "popular" | "value";
  price: string;
  priceNote: string;
  originalPrice?: string;
  priceBadge?: string;
  cta: string;
  ctaHref: string;
  accent: "blue" | "cyan" | "gold" | "green";
  icon: "zap" | "rocket" | "crown" | "building";
  features: string[];
  highlight?: string;
  highlights?: { icon: string; text: string }[];
  stats?: string;
  perfectFor: string;
  trustBadge?: string;
  showCalculator?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "FREE ESTIMATE",
    tagline: "Get started risk-free",
    price: "$0",
    priceNote: "No payment required",
    cta: "Get Instant Estimate →",
    ctaHref: "/get-started?tier=free",
    accent: "blue",
    icon: "zap",
    features: [
      "Upload your medical bill",
      "Instant AI scan (2 minutes)",
      "Potential savings estimate",
      "Basic error detection",
      "Medicare rate comparison",
      "Recommended next steps",
      "No credit card required",
      "No obligation to proceed",
    ],
    perfectFor: "Quick estimates, deciding if negotiation is worth it",
  },
  {
    id: "ai-pro",
    name: "AI ANALYSIS PRO",
    tagline: "Complete bill analysis & action plan",
    badge: "Most Popular",
    badgeStyle: "popular",
    price: "$99",
    originalPrice: "$149",
    priceNote: "One-time payment",
    priceBadge: "Save $50 - Limited Time",
    cta: "Start Deep Analysis →",
    ctaHref: "/checkout?tier=ai-pro",
    accent: "cyan",
    icon: "rocket",
    features: [
      "Everything in Free Estimate",
      "Deep AI analysis (15-30 min)",
      "Comprehensive error report",
      "→ Duplicate charges identified",
      "→ Upcoding detection",
      "→ Unbundling errors flagged",
      "→ Price overcharge analysis",
      "Line-by-line bill breakdown",
      "Fair price comparison (Medicare + local rates)",
      "3 custom negotiation letter templates",
      "Step-by-step DIY negotiation guide",
      "Financial assistance programs list",
      "Expected savings range (low/mid/high)",
      "Priority email support (24hr response)",
      "Download detailed PDF report",
    ],
    highlight: "⚡ AI Confidence Score: See how certain we are about savings",
    perfectFor: "DIY negotiators, smaller bills ($500-$3K), tech-savvy users who want to negotiate themselves",
    trustBadge: "⭐ 4.9/5 rating from 2,400+ analyses",
  },
  {
    id: "expert",
    name: "EXPERT PACKAGE",
    tagline: "Full-service negotiation with expert support",
    badge: "Best Value",
    badgeStyle: "value",
    price: "$199",
    originalPrice: "$299",
    priceNote: "One-time payment",
    priceBadge: "Most Comprehensive",
    cta: "Get Expert Help →",
    ctaHref: "/checkout?tier=expert",
    accent: "gold",
    icon: "crown",
    features: [
      "Everything in AI Analysis Pro",
      "Dedicated case manager assigned",
      "We draft ALL negotiation letters",
      "We make initial contact with provider",
      "Phone/email templates for follow-up",
      "Insurance appeal assistance (if needed)",
      "Real-time case tracking dashboard",
      "Unlimited email + chat support",
      "We handle provider communication",
      "Weekly progress video updates",
      "Success guarantee: If we don't find savings, we refund 100%",
      "Average completion time: 7-10 days",
    ],
    highlights: [
      { icon: "💬", text: "Live Chat: Direct line to your case manager" },
      { icon: "✍️", text: "We Write Everything: All letters professionally drafted" },
    ],
    stats: "Average savings: $4,200  |  Success rate: 91%",
    perfectFor: "Large bills ($3K+), busy professionals, anyone who wants expert handling",
    trustBadge: "💚 Chosen by 78% of customers over $5K bills",
  },
  {
    id: "done-for-you",
    name: "DONE-FOR-YOU",
    tagline: "We negotiate everything - you do nothing",
    price: "$299 min",
    priceNote: "$299 upfront — our expert handles everything. Then 25% of savings or $499 cap (whichever is lower).",
    priceBadge: "Full refund, no questions asked",
    cta: "Start Full Service →",
    ctaHref: "/get-started?tier=done-for-you",
    accent: "green",
    icon: "building",
    features: [
      "Everything in Expert Package",
      "$299 minimum fee upfront — dedicated expert assigned to your case",
      "Our expert handles 100% of negotiation (calls, letters, follow-up)",
      "You sign nothing, write nothing",
      "We call providers on your behalf",
      "We negotiate payment plans",
      "We handle collections (if applicable)",
      "Unlimited phone consultations",
      "Bi-weekly status calls",
      "Priority 4-hour response time",
      "Multi-bill bundling (discount for 2+ bills)",
      "Credit report cleanup assistance",
      "Financial hardship letter writing",
      "Hospital charity care applications",
      "Average savings: $7,800",
      "48-72 hour initial response from providers",
      "Full refund, no questions asked — not satisfied? We refund the upfront fee.",
    ],
    highlight: "🛡️ Our expert handles everything. Refund: no questions asked.",
    perfectFor: "Bills over $5K, complex cases, multiple bills, anyone who wants zero hassle",
    trustBadge: "🏆 93% success rate on bills over $5,000",
    showCalculator: true,
  },
];

export const comparisonRows: { feature: string; free: string; aiPro: string; expert: string; doneForYou: string }[] = [
  { feature: "Bill Upload", free: "✓", aiPro: "✓", expert: "✓", doneForYou: "✓" },
  { feature: "AI Analysis", free: "✓", aiPro: "✓", expert: "✓", doneForYou: "✓" },
  { feature: "Savings Estimate", free: "✓", aiPro: "✓", expert: "✓", doneForYou: "✓" },
  { feature: "Detailed Error Report", free: "❌", aiPro: "✓", expert: "✓", doneForYou: "✓" },
  { feature: "Negotiation Templates", free: "❌", aiPro: "3", expert: "∞", doneForYou: "∞" },
  { feature: "Expert Consultation", free: "❌", aiPro: "❌", expert: "❌", doneForYou: "Unlimited" },
  { feature: "We Draft Letters", free: "❌", aiPro: "❌", expert: "✓", doneForYou: "✓" },
  { feature: "We Contact Providers", free: "❌", aiPro: "❌", expert: "✓", doneForYou: "✓" },
  { feature: "Case Manager", free: "❌", aiPro: "❌", expert: "✓", doneForYou: "✓" },
  { feature: "Phone Support", free: "❌", aiPro: "❌", expert: "✓", doneForYou: "✓" },
  { feature: "Success Guarantee", free: "❌", aiPro: "✓", expert: "✓", doneForYou: "✓" },
  { feature: "Timeline", free: "2 min", aiPro: "24hrs", expert: "7-10d", doneForYou: "48-72hrs" },
  { feature: "Support", free: "—", aiPro: "Email", expert: "Chat", doneForYou: "Phone+Chat" },
  { feature: "Best For Bill Size", free: "Any", aiPro: "$500+", expert: "$3K+", doneForYou: "$5K+" },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What's the difference between $99 AI Analysis and $199 Expert?",
    a: "AI Analysis gives you a detailed report and DIY tools. Expert Package includes a dedicated case manager who reviews everything with you, drafts all letters, and guides you through the negotiation process step-by-step.",
  },
  {
    q: "When do I pay for the $99/$199 options?",
    a: "Pay upfront to receive your analysis. Both include money-back guarantees if we don't find significant savings opportunities.",
  },
  {
    q: "When do I pay for Done-For-You service?",
    a: "A $299 minimum fee is due upfront — our expert is assigned and handles everything from there. After we reduce your bill, you pay 25% of savings or $499 cap, whichever is lower. Full refund, no questions asked, if you're not satisfied.",
  },
  {
    q: "Can I upgrade from one tier to another?",
    a: "Yes! Start with Free Estimate or AI Analysis Pro, then upgrade to Expert or Done-For-You anytime. We'll credit what you already paid.",
  },
  {
    q: "What if my bill is really small (under $1,000)?",
    a: "Free Estimate + AI Analysis Pro ($99) often find $300-500 in savings, making it worth the investment. Expert+ tiers better for bills over $3K.",
  },
  {
    q: "Do you handle doctor bills, or just hospital bills?",
    a: "ALL medical bills: hospital, doctor, imaging, lab, ambulance, therapy, etc.",
  },
];
