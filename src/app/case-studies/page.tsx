import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/caseStudiesData";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Medical Bill Case Studies | Real Savings Stories — BillRelief",
  description:
    "See how we reduced bills from $67K to $0, $47K to $8.2K, and more. Detailed before/after case studies, timelines, and patient quotes.",
  openGraph: {
    title: "Medical Bill Case Studies | Real Savings — BillRelief",
    description: "Detailed success stories: before/after amounts, timelines, and what we did.",
  },
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "decimal" }).format(n);
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-gray-200 bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Real Case Studies
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Before/after details, step-by-step process, and exact savings. See how we help patients
              reduce medical bills by 30–100%.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="yellow" size="lg" className="font-bold">
                <Link href="/get-started">Get your free analysis</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#testimonials">Read short testimonials</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-8 border-b border-gray-200 bg-[#F9FAFB]">
          <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Jump to a story</h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.map((cs) => (
                <li key={cs.slug}>
                  <Link
                    href={`#${cs.slug}`}
                    className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#0F4C81] hover:bg-[#0F4C81]/5 hover:underline"
                  >
                    {cs.patient} · ${formatCurrency(cs.originalBill)} → $
                    {formatCurrency(cs.finalAmount)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8 max-w-4xl">
            {CASE_STUDIES.map((cs) => (
              <article
                key={cs.slug}
                id={cs.slug}
                className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-10 last:mb-0 sm:p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{cs.title}</h2>

                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-gray-500">Patient</dt>
                    <dd className="font-medium text-gray-900">
                      {cs.patient}, {cs.location}
                      {cs.age > 0 && ` (${cs.age})`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Situation</dt>
                    <dd className="font-medium text-gray-900">{cs.situation}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Incident</dt>
                    <dd className="font-medium text-gray-900">{cs.incident}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Original bill</dt>
                    <dd className="font-mono font-bold text-gray-900">
                      ${formatCurrency(cs.originalBill)}
                    </dd>
                  </div>
                  {cs.insurancePaid != null && (
                    <div>
                      <dt className="text-gray-500">Insurance paid</dt>
                      <dd className="font-mono text-gray-900">
                        ${formatCurrency(cs.insurancePaid)}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-gray-500">Patient owed (before)</dt>
                    <dd className="font-mono font-semibold text-gray-900">
                      ${formatCurrency(cs.patientOwed)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Resolution time</dt>
                    <dd className="font-medium text-gray-900">{cs.resolutionDays} days</dd>
                  </div>
                </dl>

                <h3 className="mt-6 text-lg font-bold text-gray-900">The problem</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">{cs.problem}</p>

                <h3 className="mt-6 text-lg font-bold text-gray-900">Errors we found</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                  {cs.errorsFound.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>

                <h3 className="mt-6 text-lg font-bold text-gray-900">What we did</h3>
                <ol className="mt-2 list-inside list-decimal space-y-2 text-gray-700">
                  {cs.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>

                <h3 className="mt-6 text-lg font-bold text-gray-900">Timeline</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  {cs.timeline.map((t) => (
                    <li key={t.day} className="flex gap-2">
                      <span className="font-mono font-semibold text-[#0F4C81] shrink-0">
                        Day {t.day}
                      </span>
                      <span>{t.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 p-4">
                  <h3 className="text-lg font-bold text-gray-900">Final result</h3>
                  <p className="mt-2 text-2xl font-bold text-[#10B981]">
                    ${formatCurrency(cs.originalBill)} → ${formatCurrency(cs.finalAmount)}
                  </p>
                  <p className="mt-1 text-gray-700">
                    Savings: <strong>${formatCurrency(cs.savingsAmount)}</strong> (
                    {cs.savingsPercent}%)
                  </p>
                </div>

                <blockquote className="mt-6 border-l-4 border-[#0F4C81] pl-4 italic text-gray-700">
                  &ldquo;{cs.quote}&rdquo;
                  <footer className="mt-2 not-italic font-medium text-gray-900">— {cs.patient}</footer>
                </blockquote>

                <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200/60 p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-amber-800">
                    Takeaway
                  </h3>
                  <p className="mt-1 text-gray-800">{cs.takeaway}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <section className="border-t border-gray-200 bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Ready to see your savings?</h2>
            <p className="mt-2 text-gray-600">
              Upload your bill. We&apos;ll find errors and negotiate for you.
            </p>
            <Button asChild variant="yellow" size="lg" className="mt-6 font-bold">
              <Link href="/get-started">Get my free analysis</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter tagline="Real case studies · Before/after details · 10,000+ bills reduced" />
    </div>
  );
}
