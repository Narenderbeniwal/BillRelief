import Link from "next/link";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { PricingCard } from "@/components/pricing/PricingCard";
import { ComparePlansSelector } from "@/components/pricing/ComparePlansSelector";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { TrustSignals } from "@/components/pricing/TrustSignals";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PricingStickyCTA } from "@/components/pricing/PricingStickyCTA";
import { PricingMobileCTA } from "@/components/pricing/PricingMobileCTA";
import { pricingTiers } from "@/lib/pricingData";
import { SiteHeader } from "@/components/landing/SiteHeader";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 lg:py-16">
        <PricingHeader />
        <ComparePlansSelector />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((tier, index) => (
            <div key={tier.id} id={`plan-${tier.id}`} className="scroll-mt-24">
              <PricingCard
                tier={tier}
                index={index}
                isPopular={tier.id === "ai-pro"}
              />
            </div>
          ))}
        </div>

        <ComparisonTable />
        <TrustSignals />
        <PricingFAQ />
      </main>

      <PricingStickyCTA />
      <PricingMobileCTA />

      <footer className="border-t border-gray-200 py-8 pb-24 text-center text-sm text-muted-foreground bg-white md:pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-500">
            <span className="inline-flex items-center gap-1">🔒 SSL Secured</span>
            <span className="inline-flex items-center gap-1">🛡️ HIPAA-aligned</span>
            <span className="inline-flex items-center gap-1">💳 PayPal · Card</span>
          </div>
          <p>© {new Date().getFullYear()} BillRelief.com. HIPAA Compliant. All rights reserved.</p>
          <Link href="/" className="mt-2 inline-block text-[#0F4C81] hover:underline">
            Back to Home
          </Link>
          <p className="mt-2">
            <Link href="/#how-it-works" className="text-[#0F4C81] hover:underline">How it works</Link>
            {" · "}
            <Link href="/#testimonials" className="text-[#0F4C81] hover:underline">Reviews</Link>
            {" · "}
            <Link href="/blog" className="text-[#0F4C81] hover:underline">Blog</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
