import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { CONTACT_EMAIL, SITE_DOMAIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | BillRelief",
  description: "How BillRelief collects, uses, and protects your information. HIPAA-aligned practices.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-2 text-gray-600">Last updated: February 2026</p>

        <div className="mt-8 prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">1. Introduction</h2>
            <p>
              {SITE_DOMAIN} (“BillRelief,” “we,” “us”) respects your privacy. This policy describes
              how we collect, use, store, and protect your information when you use our website and
              services, including medical bill analysis and negotiation. When we handle information
              that may constitute protected health information (PHI) under the Health Insurance
              Portability and Accountability Act (HIPAA), we follow HIPAA-aligned safeguards and, where
              applicable, Business Associate Agreements (BAAs) with covered entities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Account and contact:</strong> Email, name, and password when you register.
              </li>
              <li>
                <strong>Documents you upload:</strong> Medical bills (PDF, images) and related
                documents you submit for analysis. These may contain PHI.
              </li>
              <li>
                <strong>Usage data:</strong> Logs (e.g., IP address, browser type) for security and
                operations. We do not sell this data.
              </li>
              <li>
                <strong>Communications:</strong> Emails and messages you send to us.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">3. How We Use Your Information</h2>
            <p>
              We use your information to provide bill analysis and negotiation, communicate with
              you, improve our services, comply with law, and protect security. We do not sell your
              personal information or PHI. We use PHI only as permitted by our agreements with you
              (including HIPAA authorization) and applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">4. Security and HIPAA-Aligned Practices</h2>
            <p>
              We use industry-standard measures to protect your data, including encryption in
              transit (TLS) and at rest where applicable, access controls, audit logging of PHI
              access, and secure storage. Our practices are designed to be HIPAA-aligned. Full HIPAA
              compliance depends on our policies, BAAs with any covered entities or business
              associates, and your use of our services in accordance with our terms. For more
              detail, see our{" "}
              <Link href="/hipaa" className="text-[#0F4C81] font-medium hover:underline">
                HIPAA &amp; Security
              </Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">5. Retention and Deletion</h2>
            <p>
              We retain your data as long as needed to provide services and as required by law. You
              may request deletion of your account and associated data, subject to legal and
              contractual obligations (e.g., retention for dispute resolution or regulatory
              requirements).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or port
              your data, or to object to or restrict certain processing. To exercise these rights or
              ask questions about our privacy practices, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0F4C81] hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">7. Cookies and Tracking</h2>
            <p>
              We use essential cookies and similar technologies for authentication and security.
              We do not use third-party advertising cookies that track you across other sites for
              ads. Our site may use analytics that do not include PHI.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">8. Changes and Contact</h2>
            <p>
              We may update this policy from time to time; the “Last updated” date will change. For
              privacy-related questions or complaints, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0F4C81] hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          This policy is for general information and does not constitute legal advice. Consult your
          own counsel for questions about HIPAA or privacy law.
        </p>
      </main>
      <SiteFooter tagline="Privacy · HIPAA-aligned practices · Secure handling" />
    </div>
  );
}
