import type { Metadata } from "next";
import { QualificationQuiz } from "@/components/get-started/QualificationQuiz";
import { CostUrgency } from "@/components/landing/CostUrgency";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Get Started | Free Medical Bill Analysis — BillRelief",
  description:
    "Upload your medical bill for a free analysis. No credit card required. Results in 48 hours. No savings = no fee.",
  openGraph: {
    title: "Get Started — BillRelief",
    description: "Free medical bill analysis in 48 hours. No savings = no fee.",
    url: `${SITE_URL}/get-started`,
  },
  alternates: { canonical: `${SITE_URL}/get-started` },
  robots: { index: true, follow: true },
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <CostUrgency variant="default" />
        <div className="mt-8">
          <QualificationQuiz />
        </div>
      </main>
    </div>
  );
}
