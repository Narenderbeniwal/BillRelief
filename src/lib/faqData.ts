/**
 * FAQ data for homepage: categorized for UI, flat HOMEPAGE_FAQS for FAQPage schema.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  faqs: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "about",
    title: "About the service",
    faqs: [
      {
        question: "What is BillRelief?",
        answer:
          "BillRelief is an AI-powered medical bill analysis and negotiation service. We find errors and overcharges in your bills, then negotiate with providers on your behalf—typically delivering results in 48 hours for analysis and 7–14 days for full negotiation.",
      },
      {
        question: "What types of bills do you handle?",
        answer:
          "ALL medical bills: hospital, doctor, emergency room, lab tests, imaging (MRI, CT, X-ray), ambulance, physical therapy, and more. We work with both hospital and doctor bills—unlike some competitors who only handle certain bill types.",
      },
      {
        question: "Do you work with doctor bills or just hospital?",
        answer:
          "Both. We handle hospital bills, physician bills, anesthesiologist bills, lab and pathology, imaging, ambulance, and other medical services. If it's a medical bill, we can analyze and negotiate it.",
      },
      {
        question: "Do you work with all hospitals and providers?",
        answer:
          "Yes. Our negotiation strategies work with any medical provider in the United States. We have experience with 500+ hospital systems nationwide.",
      },
      {
        question: "What states do you serve?",
        answer:
          "We serve all 50 states. Medical bill negotiation and analysis are not limited by state—we work with providers and collectors wherever you're located.",
      },
      {
        question: "How do I know if I should use you vs DIY?",
        answer:
          "Use us if you want expert negotiation and AI-powered error detection without the time and stress. DIY works if you're comfortable calling providers, disputing line items, and following up. Our $99 AI Analysis Pro gives you a DIY toolkit if you prefer to negotiate yourself with our findings.",
      },
      {
        question: "Can you help with insurance denials?",
        answer:
          "We focus on reducing the amount you owe on medical bills (balance billing, self-pay, and out-of-network charges). For insurance denial appeals (getting your insurer to pay), that's a different process—contact us and we can advise if we can help or point you to resources.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & fees",
    faqs: [
      {
        question: "How much does it cost?",
        answer:
          "$0 upfront. For Done-For-You service, we only charge 25% of savings (or $499 flat fee, whichever is lower). AI Analysis Pro is $99 one-time.",
      },
      {
        question: "What if you don't find savings?",
        answer:
          "You pay $0. 100% risk-free. If our AI analysis doesn't find viable savings opportunities, you owe nothing.",
      },
      {
        question: "What happens if you don't find savings?",
        answer:
          "We don't charge you. Our no-savings-no-fee guarantee means you only pay when we actually reduce your bill. If we can't find savings, you walk away with no cost.",
      },
      {
        question: "Is there a minimum bill amount?",
        answer:
          "We typically work on bills of $500 or more so that potential savings justify the effort. For smaller bills, our $99 AI Analysis Pro can still help you spot errors and negotiate yourself.",
      },
      {
        question: "When do I pay the fee?",
        answer:
          "After we've secured savings and you've received the reduced bill or confirmation from the provider. You pay only on the amount we saved you (25% of savings, or $499 cap for Done-For-You).",
      },
      {
        question: "Can I cancel if I'm not satisfied?",
        answer:
          "Yes. Before we've completed negotiation, you can stop at any time. If we haven't yet delivered savings, you owe nothing. If you've already received a reduction and we're in the fee stage, contact us—we have a satisfaction policy and will work with you.",
      },
      {
        question: "Do you offer payment plans for your fee?",
        answer:
          "We accept major cards and PayPal. If you need a payment arrangement for our fee after we've saved you money, contact us and we can discuss options on a case-by-case basis.",
      },
    ],
  },
  {
    id: "process",
    title: "Process & timeline",
    faqs: [
      {
        question: "How long does it take?",
        answer:
          "AI analysis: 48 hours. Full negotiation: 7–14 days average (vs. competitors' 3–6 months).",
      },
      {
        question: "What's the step-by-step process?",
        answer:
          "You upload your bill and sign a simple HIPAA authorization. We run AI analysis and human review, then share findings. For Done-For-You, we negotiate with the provider; you get updates and the final reduced amount. You pay our fee only on the savings we secure.",
      },
      {
        question: "What if I already paid part of the bill?",
        answer:
          "We can still help. If you've made partial payments, we work with the remaining balance. In some cases we can also ask about refunds or credits if overpayment occurred. Upload your bill and payment history and we'll assess.",
      },
      {
        question: "What if the hospital refuses to negotiate?",
        answer:
          "We use proven strategies and, when appropriate, escalate to financial assistance, payment plans, or settlement options. In rare cases where a provider won't budge, we don't charge you—our fee is only on actual savings.",
      },
      {
        question: "Do I need to call the hospital myself?",
        answer:
          "No. For Done-For-You service, we handle calls and correspondence with the provider. You just upload your bill, sign the authorization, and we keep you updated.",
      },
      {
        question: "Can I negotiate myself with your analysis?",
        answer:
          "Yes! Our $99 AI Analysis Pro includes a complete DIY negotiation toolkit with templates, scripts, and step-by-step guidance. You get the analysis; you do the negotiating.",
      },
    ],
  },
  {
    id: "success",
    title: "Success & guarantees",
    faqs: [
      {
        question: "What's your success rate?",
        answer:
          "91% of qualified cases result in bill reductions. Average savings: 30–70% off original bill. We find errors in 80% of bills we review.",
      },
      {
        question: "Can you help if my bill is already in collections?",
        answer:
          "Yes! We have a 91% success rate negotiating collection debts. Collectors often accept 20–50% of the original amount. The sooner you act, the better for your credit and peace of mind.",
      },
      {
        question: "Will negotiating hurt my credit?",
        answer:
          "No. Medical providers don't report to credit bureaus unless they send your bill to collections (typically after 90–180 days). Negotiating before collections protects your credit.",
      },
      {
        question: "Is there a guarantee?",
        answer:
          "Yes. No savings, no fee. If we don't reduce your bill, you don't pay us. We only succeed when you do.",
      },
      {
        question: "What kind of savings can I expect?",
        answer:
          "Typical reductions are 30–70% of the original bill. Results vary by provider, bill type, and errors found. Our AI and experts look for duplicate charges, coding errors, and fair settlement options.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical & security",
    faqs: [
      {
        question: "Is my data secure?",
        answer:
          "Yes. We're HIPAA-aligned with 256-bit encryption, secure cloud storage, and strict access controls. We never sell your data.",
      },
      {
        question: "How do I upload my bill?",
        answer:
          "After you sign up, you can upload a PDF, JPG, or PNG of your medical bill through our secure portal. Max file size is 10MB. Our system is HIPAA-aligned.",
      },
      {
        question: "Who can see my medical information?",
        answer:
          "Only authorized BillRelief staff and systems needed to analyze and negotiate your bill. We use your information solely for your case and do not share it with third parties except as needed (e.g., HIPAA-authorized communication with the provider).",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit and debit cards and PayPal. Payment is collected only after we've secured savings for you.",
      },
    ],
  },
];

/** Flat list of all FAQs for FAQPage JSON-LD schema (rich snippets). */
export const HOMEPAGE_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((cat) => cat.faqs);
