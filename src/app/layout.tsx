import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SITE_URL, SITE_DOMAIN } from "@/lib/siteConfig";
import { OrganizationSchema, WebSiteSchema, ServiceSchema } from "@/components/seo/StructuredData";
import { TawkToWidget } from "@/components/chat/TawkToWidget";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lower Medical Bills 30-70% in 48 Hours | Free Analysis — BillRelief",
  description:
    "Get a free medical bill analysis in 48 hours. No savings = no fee. 10,000+ bills reduced, $22M+ saved. AI + expert review. Start free →",
  openGraph: {
    siteName: "BillRelief",
    title: "Lower Medical Bills 30-70% in 48 Hours | Free Analysis",
    description: "Free medical bill analysis in 48 hours. No savings = no fee. 10,000+ bills reduced. Start free.",
    url: SITE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@billreliefai",
    title: "Lower Medical Bills 30-70% in 48 Hours | Free Analysis",
    description: "Free medical bill analysis in 48 hours. No savings = no fee. Start free.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  keywords: ["medical bill reduction", "negotiate medical bills", "medical bill help", "lower hospital bills", "bill relief", "healthcare costs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <ServiceSchema />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <TawkToWidget />
      </body>
    </html>
  );
}
