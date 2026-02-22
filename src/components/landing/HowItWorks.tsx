"use client";

import { motion } from "framer-motion";
import { Upload, Search, FileCheck, Handshake } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SECTION_IMAGES } from "@/lib/trustedImages";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Bill",
    description: "Upload a PDF, JPG, or PNG of your medical bill. Our system is HIPAA-aligned and secure.",
  },
  {
    icon: Search,
    title: "AI Analysis in 48 Hours",
    description: "Our AI finds duplicate charges, upcoding, and overcharges. We compare to Medicare and fair market rates.",
  },
  {
    icon: FileCheck,
    title: "Expert Review",
    description: "A trained specialist validates the AI findings and prepares your negotiation strategy.",
  },
  {
    icon: Handshake,
    title: "We Negotiate, You Save",
    description: "We handle provider communication. You only pay a percentage of what we save you. No savings = no fee.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl md:text-3xl lg:text-4xl">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to lower your medical bills. Most users see results within 2 weeks.
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            Every recommendation is documented and reviewed before action
          </p>
        </motion.div>
        <div className="mb-10 flex justify-center gap-4">
          {SECTION_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative hidden h-32 w-48 overflow-hidden rounded-xl border border-gray-200 shadow-sm sm:block"
            >
              <ImageWithFallback
                src={img.src}
                alt={img.alt}
                fill
                sizes="240px"
                className="object-cover"
                quality={75}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-muted-foreground/30" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
