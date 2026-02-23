import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Patient Agreement | BillRelief",
  description:
    "BillRelief patient agreement: terms for medical bill negotiation services, fees, and representation.",
  openGraph: {
    title: "Patient Agreement — BillRelief",
    url: `${SITE_URL}/legal/patient-agreement`,
  },
  alternates: { canonical: `${SITE_URL}/legal/patient-agreement` },
  robots: { index: true, follow: true },
};

export default function PatientAgreementPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 prose prose-gray">
        <h1 className="text-3xl font-bold text-gray-900">
          BillRelief Patient Agreement
        </h1>
        <p className="text-muted-foreground">
          This page is a placeholder for the full Patient Agreement. In
          production, replace with your legal terms.
        </p>
        <p className="text-sm text-muted-foreground">
          By using BillRelief, you agree to our terms of service, privacy
          policy, and this patient agreement. We will represent you in
          negotiating medical bills and will charge fees only as disclosed at
          signup (e.g., percentage of savings or one-time fee depending on
          tier).
        </p>
        <Link
          href="/onboarding"
          className="inline-block mt-6 text-primary font-medium hover:underline"
        >
          ← Back to onboarding
        </Link>
      </article>
    </div>
  );
}
