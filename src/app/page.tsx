import Link from "next/link";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyCompetitorsFail } from "@/components/landing/WhyCompetitorsFail";
import { BillReliefDifference } from "@/components/landing/BillReliefDifference";
import { MarketGapSolutions } from "@/components/landing/MarketGapSolutions";
import { LocalSEOSection } from "@/components/landing/LocalSEOSection";
import { TestimonialWithCompetitorCallout } from "@/components/landing/TestimonialWithCompetitorCallout";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { FAQSection } from "@/components/landing/FAQSection";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TrustBadgesBar } from "@/components/landing/TrustBadgesBar";
import { TrustedBySection } from "@/components/landing/TrustedBySection";
import { ProofStatsSection } from "@/components/landing/ProofStatsSection";
import { SecurityComplianceSection } from "@/components/landing/SecurityComplianceSection";
import { RiskFreeGuaranteeSection } from "@/components/landing/RiskFreeGuaranteeSection";
import { TrustedImagesSection } from "@/components/landing/TrustedImagesSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
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
        <LandingCTA
          headline="Don't Let Competitors' Limitations Stop You"
          valueProp="Get 48-hour AI analysis and transparent pricing—no $5K minimum, no 4-month wait."
          primaryLabel="Get Your Free Analysis"
          primaryHref="/get-started"
          secondaryLabel="See How We're Different"
          secondaryHref="#difference"
          trustLine="✓ No upfront cost ✓ 25% fee only on savings ✓ 10,000+ bills reduced"
          icon="zap"
          variant="secondary"
        />
        <BillReliefDifference />
        <LandingCTA
          headline="Ready to Get 48-Hour Results?"
          valueProp="Upload your bill today. Our AI finds errors and overcharges in 48 hours—not months."
          primaryLabel="Start Free Bill Check"
          primaryHref="/get-started"
          secondaryLabel="View Pricing"
          secondaryHref="/pricing"
          trustLine="48-hour turnaround · Human-reviewed · No savings, no fee"
          icon="clock"
          variant="primary"
        />
        <ProofStatsSection />
        <TrustedImagesSection />
        <MarketGapSolutions />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <LandingCTA
          headline="Start Your Bill Analysis Now"
          valueProp="Four simple steps: upload, AI analysis, expert review, and we negotiate for you."
          primaryLabel="Upload My Bill"
          primaryHref="/get-started"
          secondaryLabel="How It Works"
          secondaryHref="#how-it-works"
          trustLine="HIPAA secure · No credit card required · Average $4,200 saved"
          icon="fileCheck"
          variant="secondary"
        />
        <SecurityComplianceSection />
        <LocalSEOSection />
        <TestimonialWithCompetitorCallout />
        <LandingCTA
          headline="Join 10,000+ Patients Who Saved"
          valueProp="See why patients switch from slow, opaque services to BillRelief."
          primaryLabel="Get Free Analysis"
          primaryHref="/get-started"
          secondaryLabel="Read Stories"
          secondaryHref="#testimonials"
          trustLine="4.9/5 rating · $22M+ saved · Risk-free"
          icon="users"
          variant="secondary"
        />
        <RiskFreeGuaranteeSection />
        <FinalCTASection />
        <FAQSection />
        <LandingCTA
          headline="Your Medical Bill Won't Negotiate Itself"
          valueProp="One click. 48 hours. Real savings. Stop overpaying today."
          primaryLabel="Get Free Scan Now"
          primaryHref="/get-started"
          secondaryLabel="See Plans"
          secondaryHref="/pricing"
          trustLine="Free estimate · No commitment · 10,000+ bills reduced"
          icon="alertCircle"
          variant="primary"
        />
        <section className="border-t bg-muted/30 py-10 sm:py-12 md:py-14">
          <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8 text-center">
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
      <ExitIntentPopup />
      <StickyMobileCTA />
      <SiteFooter tagline="Transparent pricing · No savings, no fee options · Encrypted document handling" />
    </div>
  );
}
