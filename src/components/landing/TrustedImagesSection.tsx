"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TRUSTED_IMAGES } from "@/lib/trustedImages";
import { Button } from "@/components/ui/button";

type TrustedImagesSectionProps = {
  /** When true, CTA points to plans on this page instead of /pricing */
  onPricingPage?: boolean;
};

export function TrustedImagesSection({ onPricingPage }: TrustedImagesSectionProps = {}) {
  return (
    <section className="border-t border-gray-200 bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Trusted by Thousands · Real Savings, Real Relief
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Join patients who&apos;ve lowered their medical bills with AI-powered analysis and expert support. No savings, no fee.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
          {TRUSTED_IMAGES.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-2 text-center text-xs font-semibold text-white drop-shadow-lg sm:p-3 sm:text-sm">
                {item.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-gray-500">
            Free estimate · No commitment · Secure checkout with PayPal
          </p>
          <Button asChild size="lg" variant="yellow" className="font-semibold shadow-md">
            <Link href={onPricingPage ? "#plan-ai-pro" : "/get-started"}>
              {onPricingPage ? "Choose a plan below" : "Get Started — It's Free"}
            </Link>
          </Button>
          {!onPricingPage && (
            <Link
              href="/pricing"
              className="text-sm font-medium text-[#0F4C81] hover:underline"
            >
              See plans & pricing →
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
