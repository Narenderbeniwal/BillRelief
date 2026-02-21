import Link from "next/link";
import { SITE_DOMAIN, CONTACT_EMAIL } from "@/lib/siteConfig";

type SiteFooterProps = {
  /** Extra line below contact (e.g. "Transparent pricing · ...") */
  tagline?: React.ReactNode;
  /** Extra row above copyright (e.g. badges) */
  top?: React.ReactNode;
  /** Extra links row below contact */
  links?: React.ReactNode;
  className?: string;
};

export function SiteFooter({ tagline, top, links, className = "" }: SiteFooterProps) {
  return (
    <footer className={`border-t py-8 text-center text-sm text-muted-foreground pb-20 sm:pb-8 md:pb-8 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        {top && <div className="mb-4">{top}</div>}
        <p>© 2026 {SITE_DOMAIN}. HIPAA Compliant. All rights reserved.</p>
        <p className="mt-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#0F4C81] font-medium hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <span className="text-muted-foreground"> — Contact us</span>
        </p>
        {tagline && <p className="mt-2 text-xs text-gray-500">{tagline}</p>}
        {links && <div className="mt-2">{links}</div>}
      </div>
    </footer>
  );
}
