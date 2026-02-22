/**
 * Detailed case studies for /case-studies page.
 */

export interface CaseStudyTimelineEntry {
  day: number;
  text: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  patient: string;
  location: string;
  age: number;
  situation: string;
  incident: string;
  originalBill: number;
  insurancePaid?: number;
  patientOwed: number;
  resolutionDays: number;
  problem: string;
  errorsFound: string[];
  steps: string[];
  timeline: CaseStudyTimelineEntry[];
  finalAmount: number;
  savingsAmount: number;
  savingsPercent: number;
  quote: string;
  takeaway: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sarah-appendectomy",
    title: "From $47,000 to $8,200: Sarah's Appendectomy Bill Nightmare",
    patient: "Sarah M.",
    location: "Austin, TX",
    age: 32,
    situation: "Teacher, single mom of 2",
    incident: "Emergency appendectomy, 3-day hospital stay",
    originalBill: 47000,
    insurancePaid: 12000,
    patientOwed: 35000,
    resolutionDays: 11,
    problem:
      "Sarah's insurance had a $10,000 deductible. After insurance paid their portion, she was left with a $35,000 bill—more than half her annual salary. She had no idea how she would pay it and was terrified of collections.",
    errorsFound: [
      "Duplicate charge for surgical supplies ($2,100)",
      "Out-of-network anesthesiologist billed at full rate ($4,200 over network allowance)",
      "Unbundled lab tests that should have been grouped ($800)",
      "Charges for supplies never used ($600)",
    ],
    steps: [
      "Obtained itemized bill and HIPAA authorization from Sarah.",
      "Ran AI analysis and flagged 4 categories of errors and overcharges.",
      "Human reviewer validated findings and built negotiation brief.",
      "Opened dialogue with hospital patient financial services.",
      "Presented duplicate and erroneous charges; requested adjustment.",
      "Negotiated anesthesiologist balance to in-network equivalent.",
      "Requested financial assistance application; Sarah qualified for 60% charity reduction on remaining balance.",
      "Final agreed amount: $8,200 with a 24-month interest-free payment plan.",
    ],
    timeline: [
      { day: 1, text: "Sarah uploaded her bill and signed HIPAA authorization." },
      { day: 2, text: "AI analysis completed; 4 error categories identified." },
      { day: 3, text: "Expert review and negotiation brief prepared." },
      { day: 5, text: "First contact with hospital; itemized dispute submitted." },
      { day: 7, text: "Hospital agreed to remove $2,900 in duplicate/wrong charges." },
      { day: 9, text: "Anesthesiologist balance reduced to in-network rate." },
      { day: 11, text: "Charity care approved; final amount $8,200 with payment plan." },
    ],
    finalAmount: 8200,
    savingsAmount: 38800,
    savingsPercent: 83,
    quote:
      "I thought I was going to have to declare bankruptcy. BillRelief found thousands in errors I never would have caught, and got me on a payment plan I can actually afford. My case manager was with me every step.",
    takeaway:
      "Even with insurance, high deductibles leave you with huge bills. Itemized review and financial assistance can cut what you owe by 80% or more.",
  },
  {
    slug: "david-heart-procedure",
    title: "$67,000 Hospital Bill Reduced to $0: David's Heart Procedure",
    patient: "David M.",
    location: "Atlanta, GA",
    age: 58,
    situation: "Self-employed contractor, no insurance",
    incident: "Cardiac catheterization and stent placement, 2-day stay",
    originalBill: 67000,
    resolutionDays: 14,
    problem:
      "David had a heart scare and went to the ER. With no insurance, he received a $67,000 bill. He had no way to pay it and feared losing his home. He had heard about charity care but didn't know how to apply or what to ask for.",
    errorsFound: [
      "Charges for upgraded room never requested ($400/night × 2)",
      "Duplicate pharmacy charges ($320)",
      "Miscoded procedure (CPT upcharge of ~$3,200)",
      "Multiple routine labs billed at non-contract rates",
    ],
    steps: [
      "Reviewed full itemized bill and identified billing errors.",
      "Researched hospital's financial assistance (charity care) policy.",
      "Prepared financial assistance application with David's income documentation.",
      "Submitted application and error dispute together.",
      "Followed up with financial counseling department.",
      "Hospital approved 100% charity care due to income and hardship.",
      "Balance reduced to $0; no payment plan required.",
    ],
    timeline: [
      { day: 1, text: "David uploaded bill; we confirmed no insurance." },
      { day: 3, text: "AI + human review found errors and charity care eligibility likely." },
      { day: 5, text: "Gathered income docs; submitted charity application and dispute." },
      { day: 10, text: "Hospital requested one additional document." },
      { day: 14, text: "Approval: 100% charity care. Balance $0." },
    ],
    finalAmount: 0,
    savingsAmount: 67000,
    savingsPercent: 100,
    quote:
      "I had given up. I thought they'd take my house. BillRelief helped me apply for help I didn't know existed. I paid nothing. I still cry when I think about it.",
    takeaway:
      "Uninsured doesn't mean you're stuck. Many hospitals have charity care that can wipe out your bill if you qualify. Getting errors fixed first strengthens your case.",
  },
  {
    slug: "jennifer-anesthesiologist",
    title: "Anesthesiologist Bill Cut by 46%: Jennifer's Story",
    patient: "Jennifer K.",
    location: "Phoenix, AZ",
    age: 41,
    situation: "Marketing manager, insured",
    incident: "Outpatient surgery; separate anesthesiologist bill",
    originalBill: 4800,
    patientOwed: 4800,
    resolutionDays: 3,
    problem:
      "Jennifer's surgery was in-network, but the anesthesiologist was out-of-network and sent a bill for $4,800. Her insurance had already paid a portion to the facility, but she was stuck with this separate bill. Another service had told her they 'don't handle doctor bills.'",
    errorsFound: [
      "Wrong CPT code (higher-paying code used; correct one was 20% lower)",
      "Time units billed in excess of actual procedure time",
    ],
    steps: [
      "Obtained anesthesiologist bill and surgery notes (with authorization).",
      "Matched procedure to correct CPT and time units.",
      "Submitted corrected coding to billing group.",
      "Negotiated remaining balance to in-network equivalent.",
      "Agreed final amount: $2,600.",
    ],
    timeline: [
      { day: 1, text: "Jennifer uploaded the anesthesiologist bill." },
      { day: 2, text: "Coding review completed; dispute drafted." },
      { day: 3, text: "Billing office agreed; balance set at $2,600." },
    ],
    finalAmount: 2600,
    savingsAmount: 2200,
    savingsPercent: 46,
    quote:
      "Another company said they don't handle doctor bills. BillRelief did. They found a coding error and got me from $4,800 to $2,600 in three days.",
    takeaway:
      "Doctor and facility bills can be negotiated separately. Coding errors are common; a focused review often yields quick wins.",
  },
  {
    slug: "rodriguez-family-er-bills",
    title: "From $12,000 to $4,500: The Rodriguez Family's ER Bills",
    patient: "The Rodriguez Family",
    location: "Miami, FL",
    age: 0,
    situation: "Family of 4, household income ~$95K",
    incident: "Multiple ER and specialist bills (child illness + parent follow-up)",
    originalBill: 12000,
    patientOwed: 12000,
    resolutionDays: 7,
    problem:
      "The Rodriguezes made too much for most income-based programs but not enough to pay $12,000 in medical bills. They felt stuck in the middle—too 'rich' for help, too poor to pay.",
    errorsFound: [
      "Duplicate ER facility fees (two visits; one double-billed)",
      "Unbundled radiology reads",
      "Charges for waived copays that were later billed",
    ],
    steps: [
      "Consolidated all family bills and authorizations.",
      "Identified duplicates and unbundling across providers.",
      "Disputed errors with each billing office.",
      "Requested payment plans and one-time settlement offers.",
      "Secured 40% settlement on largest bill; errors removed on others.",
      "Combined final total: $4,500 with manageable payment plans.",
    ],
    timeline: [
      { day: 1, text: "All bills uploaded; HIPAA forms signed for each family member." },
      { day: 3, text: "Duplicates and errors identified across 4 bills." },
      { day: 5, text: "Disputes submitted; settlement offers requested." },
      { day: 7, text: "Agreements reached; total owed $4,500 on payment plans." },
    ],
    finalAmount: 4500,
    savingsAmount: 7500,
    savingsPercent: 63,
    quote:
      "We make $95K a year—too much for assistance, too little to pay $12K. BillRelief was our only hope. They got us down to $4,500. We can breathe again.",
    takeaway:
      "Middle-income families often fall through the cracks. Combining error disputes with settlement requests can cut total debt by more than half.",
  },
  {
    slug: "rachel-er-son",
    title: "ER Visit for My Son: $6,200 to $2,100 in 4 Days",
    patient: "Rachel L.",
    location: "Denver, CO",
    age: 0,
    situation: "Parent of 2, insured",
    incident: "Child ER visit, few hours, standard workup",
    originalBill: 6200,
    patientOwed: 6200,
    resolutionDays: 4,
    problem:
      "Rachel's son had a high fever and was taken to the ER. A few hours and some tests later, she received a $6,200 bill. Her insurance had denied part of the claim due to 'coding.' She didn't know how to fight it.",
    errorsFound: [
      "Duplicate line items for same lab panel",
      "ER level coded as 4 instead of 3 (downcode reduced bill by ~$1,800)",
      "Separate charge for IV that was part of facility fee",
    ],
    steps: [
      "Requested itemized bill and EOB from insurer.",
      "Compared CPT codes to chart; identified level and duplicate issues.",
      "Submitted coding correction request to hospital.",
      "Re-submitted to insurance after hospital corrected codes.",
      "Insurance paid additional amount; patient balance reduced to $2,100.",
    ],
    timeline: [
      { day: 1, text: "Rachel uploaded bill and EOB." },
      { day: 2, text: "Coding and duplicate issues identified." },
      { day: 3, text: "Hospital agreed to correct codes and remove duplicates." },
      { day: 4, text: "Revised bill; insurance reprocessed; balance $2,100." },
    ],
    finalAmount: 2100,
    savingsAmount: 4100,
    savingsPercent: 66,
    quote:
      "I had no idea they'd overcharged for the ER level and double-billed labs. BillRelief fixed it in four days. Worth every penny of the fee.",
    takeaway:
      "ER bills are often inflated by wrong level codes and duplicate line items. A quick, focused review can cut the balance by 60% or more.",
  },
  {
    slug: "amanda-c-section-nicu",
    title: "C-Section and NICU: $28,000 to $9,200",
    patient: "Amanda T.",
    location: "Houston, TX",
    age: 29,
    situation: "First-time mom, insured with high deductible",
    incident: "C-section delivery, baby in NICU 5 days",
    originalBill: 28000,
    patientOwed: 28000,
    resolutionDays: 11,
    problem:
      "Amanda's delivery was covered, but her baby's NICU stay and several related bills landed on her. She was overwhelmed with new motherhood and $28,000 in bills. She didn't know where to start.",
    errorsFound: [
      "NICU daily rate billed at wrong level for 2 days",
      "Duplicate charges for newborn screening",
      "Supplies billed to mom's account that belonged to baby's",
    ],
    steps: [
      "Organized all mom and baby bills with authorizations.",
      "Separated facility vs. professional charges; identified misallocated items.",
      "Disputed NICU level and duplicates with hospital.",
      "Requested financial assistance for remaining balance.",
      "Combined error corrections and partial charity; final $9,200.",
    ],
    timeline: [
      { day: 1, text: "Amanda sent all delivery and NICU bills." },
      { day: 4, text: "Errors and misallocations identified." },
      { day: 7, text: "Disputes submitted; financial assistance application started." },
      { day: 11, text: "Adjustments applied; charity portion approved. Total $9,200." },
    ],
    finalAmount: 9200,
    savingsAmount: 18800,
    savingsPercent: 67,
    quote:
      "I was drowning in bills and hormones. BillRelief handled everything. They explained every step. Mental health relief as much as financial.",
    takeaway:
      "Birth and NICU bills are complex. Splitting mom vs. baby charges and disputing level and duplicates often yields large reductions.",
  },
  {
    slug: "michael-ambulance",
    title: "Ambulance Bill: $4,500 to $1,350",
    patient: "Michael R.",
    location: "Seattle, WA",
    age: 44,
    situation: "Freelance designer, insured",
    incident: "10-minute ambulance ride after fall",
    originalBill: 4500,
    patientOwed: 4500,
    resolutionDays: 5,
    problem:
      "Michael had a bad fall and was taken by ambulance to the ER. The ride was 10 minutes. The bill was $4,500. He thought it was a mistake. His insurance had already denied it as out-of-network.",
    errorsFound: [
      "Mileage and base rate both inflated vs. usual rates",
      "Advanced life support (ALS) billed when care was basic (BLS)",
    ],
    steps: [
      "Obtained itemized ambulance bill and run report.",
      "Verified level of service (BLS vs. ALS) and mileage.",
      "Disputed ALS and overcharges with ambulance provider.",
      "Negotiated settlement to typical BLS rate for distance.",
      "Agreed amount: $1,350.",
    ],
    timeline: [
      { day: 1, text: "Michael uploaded ambulance bill." },
      { day: 2, text: "Level of service and mileage verified; dispute prepared." },
      { day: 5, text: "Provider agreed; balance $1,350." },
    ],
    finalAmount: 1350,
    savingsAmount: 3150,
    savingsPercent: 70,
    quote:
      "I thought $4,500 for a 10-minute ride was a joke. BillRelief got it down to $1,350. Fast and professional.",
    takeaway:
      "Ambulance bills are often coded at a higher level than the care given. Checking level of service and mileage can cut the bill by more than half.",
  },
  {
    slug: "patricia-physical-therapy",
    title: "Physical Therapy Stack: $5,600 to $2,200",
    patient: "Patricia H.",
    location: "Boston, MA",
    age: 56,
    situation: "Retired teacher, Medicare + supplement",
    incident: "12 sessions of PT for knee replacement follow-up",
    originalBill: 5600,
    patientOwed: 5600,
    resolutionDays: 8,
    problem:
      "Patricia had completed PT but then received a stack of bills totaling $5,600. Some were from the clinic, some from a billing company. She had already paid copays and thought she was done. No one else would touch 'just PT' bills.",
    errorsFound: [
      "Duplicate CPT codes for same session (multiple units billed incorrectly)",
      "Charges for sessions not documented in her records",
    ],
    steps: [
      "Gathered all PT statements and session notes (with authorization).",
      "Matched sessions to billed codes; found duplicate and unsupported units.",
      "Disputed with clinic and billing company.",
      "Clinic agreed to remove duplicate charges and unverified sessions.",
      "Final balance: $2,200.",
    ],
    timeline: [
      { day: 1, text: "Patricia uploaded all PT bills and gave authorization." },
      { day: 3, text: "Session-by-session review; duplicates and errors listed." },
      { day: 6, text: "Dispute sent to clinic and billing company." },
      { day: 8, text: "Adjustments made. Balance $2,200." },
    ],
    finalAmount: 2200,
    savingsAmount: 3400,
    savingsPercent: 61,
    quote:
      "No one else would touch PT bills. BillRelief found duplicate CPT codes and got me to $2,200 in 8 days.",
    takeaway:
      "Therapy and repeat visits are prone to duplicate or incorrect unit billing. A session-level review can uncover significant overcharges.",
  },
  {
    slug: "robert-colonoscopy",
    title: "Colonoscopy and Pathology: $7,100 to $2,500",
    patient: "Robert S.",
    location: "San Diego, CA",
    age: 52,
    situation: "Small business owner, high-deductible plan",
    incident: "Screening colonoscopy with pathology",
    originalBill: 7100,
    patientOwed: 7100,
    resolutionDays: 6,
    problem:
      "Robert had a screening colonoscopy. His plan required him to pay until he hit his deductible. The facility and pathology bills together were $7,100. He knew screening was supposed to be covered but was told 'pathology isn't included' and gave up.",
    errorsFound: [
      "Wrong place-of-service code (facility vs. non-facility)",
      "Pathology codes included non-covered add-ons; base screening code was covered",
      "Facility fee included items that should have been bundled",
    ],
    steps: [
      "Reviewed facility and pathology bills and EOBs.",
      "Corrected place-of-service and identified covered vs. non-covered codes.",
      "Submitted corrected codes to facility and lab.",
      "Insurer reprocessed; patient responsibility dropped.",
      "Negotiated remaining patient balance with facility and path group.",
      "Final total: $2,500.",
    ],
    timeline: [
      { day: 1, text: "Robert uploaded facility and pathology bills." },
      { day: 2, text: "Coding and coverage issues identified." },
      { day: 4, text: "Corrections submitted; insurer reprocessed." },
      { day: 6, text: "Remaining balance negotiated to $2,500." },
    ],
    finalAmount: 2500,
    savingsAmount: 4600,
    savingsPercent: 65,
    quote:
      "BillRelief's AI caught wrong codes and out-of-network markups. Final bill $2,500. I recommend them to everyone.",
    takeaway:
      "Screening colonoscopy is often fully covered, but facility and pathology coding can create unexpected bills. Correcting codes and disputing markups can restore coverage and reduce balance.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
