"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HIPAADocumentModal } from "./HIPAADocumentModal";

export function HIPAAAuthorizationStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [signed, setSigned] = useState(false);

  const handleSign = () => {
    setSigned(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Let Us Represent You
        </h2>
        <p className="text-lg text-gray-600">
          Sign a HIPAA authorization that will let us speak to hospitals and
          insurance companies on your behalf.
        </p>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 mb-6 border border-orange-200">
        <div className="flex items-start gap-3 mb-6">
          <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">
              Why We Need HIPAA Authorization
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              HIPAA (Health Insurance Portability and Accountability Act)
              protects your medical information. To negotiate on your behalf, we
              need your written permission to discuss your bills with healthcare
              providers and insurers.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-orange-200">
          <h4 className="font-semibold text-gray-900 mb-3">
            What This Authorization Allows:
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-1">✓</span>
              <span>Contact hospitals and medical providers about your bills</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-1">✓</span>
              <span>Discuss charges and request itemized billing</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-1">✓</span>
              <span>Negotiate payment terms and reductions on your behalf</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-1">✓</span>
              <span>Review your medical billing records for errors</span>
            </li>
          </ul>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>HIPAA-aligned • Bank-Level Encryption • Secure Storage</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="order-2 sm:order-1">
          Back
        </Button>
        <Button
          type="button"
          variant="yellow"
          className="flex-1 order-1 sm:order-2"
          onClick={() => (signed ? onNext() : setShowModal(true))}
        >
          {signed ? "Continue" : "Review and Sign"}
        </Button>
      </div>

      {signed && (
        <p className="mt-3 text-sm text-green-700 font-medium flex items-center gap-2">
          <Shield className="w-4 h-4" /> HIPAA authorization signed. Click Continue to proceed.
        </p>
      )}

      <p className="text-center text-sm text-gray-500 mt-6">
        Your information is protected and will only be used for bill negotiation
        purposes.
      </p>

      {showModal && (
        <HIPAADocumentModal
          onClose={() => setShowModal(false)}
          onSign={handleSign}
        />
      )}
    </motion.div>
  );
}
