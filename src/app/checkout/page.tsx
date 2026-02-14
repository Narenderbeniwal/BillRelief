import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { CheckoutSocialProof } from "@/components/checkout/CheckoutSocialProof";

const TIER_AMOUNTS: Record<string, { amount: string; name: string }> = {
  "ai-pro": { amount: "99", name: "AI Analysis Pro" },
  expert: { amount: "199", name: "Expert Package" },
};

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { tier?: string };
}) {
  const tier = searchParams.tier?.toLowerCase();
  const plan = tier ? TIER_AMOUNTS[tier] : null;

  if (!tier || !plan) {
    redirect("/pricing");
  }

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <header className="border-b border-white/10 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-xl font-bold text-white">
            BillRelief
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-md px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-white">Complete your secure checkout</h1>
        <p className="mt-2 text-gray-300">
          {plan.name} — ${plan.amount} one-time
        </p>
        <div className="mt-4">
          <CheckoutSocialProof tierId={tier} />
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-sm text-gray-300">
          <p className="font-semibold text-white">What happens after payment</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Immediate confirmation and onboarding step</li>
            <li>Your case enters our priority analysis queue</li>
            <li>Clear next actions delivered to your dashboard</li>
          </ul>
        </div>
        <div className="mt-8">
          <CheckoutClient
            tierId={tier}
            amount={plan.amount}
            description={plan.name}
          />
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          Secure payment via PayPal (card or wallet). You will receive a confirmation email.
        </p>
        <p className="mt-2 flex items-center justify-center gap-3 text-xs text-gray-500">
          <span>PayPal</span>
          <span>Visa · Mastercard · Amex</span>
        </p>
        <Link
          href="/pricing"
          className="mt-4 block text-center text-sm text-cyan-400 hover:underline"
        >
          ← Back to pricing
        </Link>
      </main>
    </div>
  );
}
