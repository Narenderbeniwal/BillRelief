import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { CONTACT_EMAIL, SITE_DOMAIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "HIPAA & Security | BillRelief",
  description: "How BillRelief protects your health information with HIPAA-aligned safeguards.",
};

export default function HIPAAPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">HIPAA &amp; Security</h1>
        <p className="mt-2 text-gray-600">
          How we protect your health information and align with HIPAA.
        </p>

        <div className="mt-8 prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">Our Commitment</h2>
            <p>
              BillRelief handles documents that may contain protected health information (PHI). We
              implement administrative, technical, and physical safeguards designed to align with
              the Health Insurance Portability and Accountability Act (HIPAA) Security and Privacy
              Rules. This page summarizes our practices. It is not a guarantee of any particular
              legal outcome; full HIPAA compliance depends on our policies, Business Associate
              Agreements (BAAs) where required, risk assessments, and your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">Safeguards We Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Encryption:</strong> Data in transit is encrypted (TLS). Data at rest is
                stored using secure, access-controlled storage (e.g., encrypted cloud storage).
              </li>
              <li>
                <strong>Access controls:</strong> Only authorized personnel and systems can access
                PHI, on a need-to-know basis. Access is tied to authentication and roles.
              </li>
              <li>
                <strong>Audit logging:</strong> We log access to PHI (e.g., when a bill document
                is viewed or downloaded) to support accountability and breach investigation.
              </li>
              <li>
                <strong>Session security:</strong> Sessions time out after a period of inactivity to
                reduce the risk of unauthorized access.
              </li>
              <li>
                <strong>Secure file handling:</strong> Uploaded documents are stored in a secure
                manner; download responses use generic filenames where appropriate to avoid
                exposing PHI in headers.
              </li>
              <li>
                <strong>Security headers:</strong> Our website uses headers such as
                Strict-Transport-Security and Referrer-Policy to improve security.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">Your Authorization</h2>
            <p>
              Before we contact providers or insurers about your bills, we obtain your HIPAA
              authorization. That authorization describes what we may do with your PHI and how you
              can revoke it. We use and disclose PHI only as allowed by your authorization and
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">Your Rights</h2>
            <p>
              You have the right to request access to your PHI that we hold, to request corrections
              in certain circumstances, and to request an accounting of disclosures where required
              by law. You may also have the right to request restrictions on uses and disclosures.
              To exercise these rights or to report a concern, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0F4C81] hover:underline">
                {CONTACT_EMAIL}
              </a>
              . We will not retaliate against you for exercising your rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">Breach Notification</h2>
            <p>
              If we discover a breach of unsecured PHI that affects you, we will notify you and, where
              required, the Secretary of Health and Human Services, in accordance with HIPAA and
              applicable state law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">Business Associates</h2>
            <p>
              Where we act as a business associate of a covered entity (or vice versa), we enter
              into or maintain BAAs that require appropriate safeguards and compliance with HIPAA.
              Our subprocessors and vendors that handle PHI are selected with security and
              compliance in mind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8">Disclaimer</h2>
            <p>
              This page is for informational purposes only and does not constitute legal or
              compliance advice. HIPAA compliance is an ongoing process and depends on many
              factors, including your role (covered entity vs. business associate), the nature of
              the PHI, and applicable state laws. Consult your own legal or compliance advisor for
              guidance specific to your situation.
            </p>
          </section>
        </div>

        <p className="mt-10">
          <Link href="/privacy" className="text-[#0F4C81] font-medium hover:underline">
            ← Privacy Policy
          </Link>
        </p>
      </main>
      <SiteFooter tagline="HIPAA-aligned · Secure handling · Your rights" />
    </div>
  );
}
