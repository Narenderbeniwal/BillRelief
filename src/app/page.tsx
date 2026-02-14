import Link from "next/link";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyCompetitorsFail } from "@/components/landing/WhyCompetitorsFail";
import { BillReliefDifference } from "@/components/landing/BillReliefDifference";
import { MarketGapSolutions } from "@/components/landing/MarketGapSolutions";
import { LocalSEOSection } from "@/components/landing/LocalSEOSection";
import { TestimonialWithCompetitorCallout } from "@/components/landing/TestimonialWithCompetitorCallout";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TrustBadgesBar } from "@/components/landing/TrustBadgesBar";
import { TrustedBySection } from "@/components/landing/TrustedBySection";
import { ProofStatsSection } from "@/components/landing/ProofStatsSection";
import { SecurityComplianceSection } from "@/components/landing/SecurityComplianceSection";
import { RiskFreeGuaranteeSection } from "@/components/landing/RiskFreeGuaranteeSection";
import { TrustedImagesSection } from "@/components/landing/TrustedImagesSection";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <TrustBadgesBar />
        <TrustedBySection />
        <WhyCompetitorsFail />
        <BillReliefDifference />
        <ProofStatsSection />
        <TrustedImagesSection />
        <MarketGapSolutions />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <SecurityComplianceSection />
        <LocalSEOSection />
        <TestimonialWithCompetitorCallout />
        <RiskFreeGuaranteeSection />
        <FinalCTASection />
        <section className="border-t bg-muted/30 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-4 text-sm">
              Free estimate · No commitment · 10,000+ bills reduced
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button asChild size="lg" variant="yellow">
                <Link href="/get-started">Get Started — It&apos;s Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login?callbackUrl=/dashboard/blogs/new">Write a blog post</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <StickyMobileCTA />
      <footer className="border-t py-8 text-center text-sm text-muted-foreground pb-20 sm:pb-8">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} BillRelief.com. HIPAA Compliant. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500">
            Transparent pricing · No savings, no fee options · Encrypted document handling
          </p>
        </div>
      </footer>
    </div>
  );
}
