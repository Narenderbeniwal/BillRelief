import Link from "next/link";
import {
  SITE_DOMAIN,
  CONTACT_EMAIL,
  CUSTOMER_SERVICE_HOURS,
  SOCIAL_LINKS,
  BBB_URL,
} from "@/lib/siteConfig";
import { Shield, CreditCard, Twitter, Linkedin, Facebook, Award } from "lucide-react";

type SiteFooterProps = {
  tagline?: React.ReactNode;
  top?: React.ReactNode;
  links?: React.ReactNode;
  className?: string;
};

export function SiteFooter({ tagline, top, links, className = "" }: SiteFooterProps) {
  return (
    <footer
      className={`border-t bg-[#F9FAFB] py-10 text-sm text-muted-foreground pb-20 sm:pb-10 md:pb-10 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        {top && <div className="mb-6">{top}</div>}

        {/* Featured in / Awards */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Featured in
          </p>
          <div className="flex flex-wrap items-center gap-6 text-gray-500">
            <span className="font-medium text-gray-600">Healthcare Innovation</span>
            <span className="font-medium text-gray-600">Patient Advocate Digest</span>
            <span className="font-medium text-gray-600">FinHealth Today</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-amber-700">
            <Award className="h-4 w-4 shrink-0" />
            <span>HIPAA Compliant · 4.9/5 from 2,400+ reviews</span>
          </div>
        </div>

        {/* Trust: Security + Payment + BBB */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-6 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Shield className="h-4 w-4 text-[#10B981]" />
            <span>Norton Secured</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Shield className="h-4 w-4 text-[#10B981]" />
            <span>McAfee Secure</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>PayPal · Visa · Mastercard</span>
          </div>
          <a
            href={BBB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#0F4C81] hover:underline"
          >
            BBB A+ Accredited
          </a>
        </div>

        {/* Contact + Hours + Quick links */}
        <div className="mb-6 text-center">
          <p className="font-medium text-gray-900">Customer support</p>
          <p className="mt-1">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#0F4C81] font-medium hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-1 text-xs text-gray-500">{CUSTOMER_SERVICE_HOURS}</p>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
            <Link href="/pricing" className="text-[#0F4C81] hover:underline">
              Pricing
            </Link>
            <Link href="/case-studies" className="text-[#0F4C81] hover:underline">
              Case Studies
            </Link>
            <Link href="/get-started" className="text-[#0F4C81] hover:underline">
              Get Started
            </Link>
            <Link href="/blog" className="text-[#0F4C81] hover:underline">
              Blog
            </Link>
          </p>
        </div>

        {/* Social */}
        <div className="mb-6 flex justify-center gap-4">
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-[#0F4C81]"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-[#0F4C81]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-[#0F4C81]"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-500">
          © 2026 {SITE_DOMAIN}. HIPAA Compliant. All rights reserved.
        </p>
        {tagline && <p className="mt-2 text-center text-xs text-gray-500">{tagline}</p>}
        {links && <div className="mt-2 text-center">{links}</div>}
      </div>
    </footer>
  );
}
