import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Create Account | BillRelief",
  description:
    "Sign up to upload medical bills and track your savings. Free analysis in 48 hours. No savings = no fee.",
  openGraph: {
    title: "Create Account — BillRelief",
    url: `${SITE_URL}/register`,
  },
  alternates: { canonical: `${SITE_URL}/register` },
  robots: { index: true, follow: true },
};

export default function RegisterLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
