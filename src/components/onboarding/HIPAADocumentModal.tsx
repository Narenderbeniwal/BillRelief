"use client";

import { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const HIPAA_DOCUMENT = `
BILLRELIEF HIPAA AUTHORIZATION FOR RELEASE OF MEDICAL INFORMATION

I, the undersigned, authorize BillRelief and its designated representatives to use and disclose my protected health information (PHI) as described below for the purpose of reviewing, analyzing, and negotiating my medical bills on my behalf.

1. INFORMATION TO BE DISCLOSED
   - Medical bills and statements
   - Itemized charges and CPT/ICD codes
   - Insurance claims and EOBs
   - Correspondence with providers and insurers related to my bills

2. PERSONS/ENTITIES AUTHORIZED TO RECEIVE INFORMATION
   - Hospitals, medical practices, and healthcare providers that have billed me
   - Health insurance companies and third-party administrators
   - BillRelief staff and contracted agents acting on my behalf

3. PURPOSE
   - To identify billing errors, overcharges, and negotiation opportunities
   - To communicate with providers and insurers regarding my bills
   - To obtain itemized bills and pursue reductions on my behalf

4. EXPIRATION
   This authorization remains in effect until I revoke it in writing or until my case is closed, whichever is earlier.

5. I understand I may revoke this authorization at any time by notifying BillRelief in writing. I understand that treatment or payment cannot be conditioned on signing this form where prohibited by law.

By signing below, I acknowledge that I have read and understand this authorization.
`;

export function HIPAADocumentModal({
  onClose,
  onSign,
}: {
  onClose: () => void;
  onSign: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl max-h-[90vh] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white shadow-2xl border border-gray-200 flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          onEscapeKeyDown={onClose}
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              HIPAA Authorization Document
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed"
          >
            {HIPAA_DOCUMENT}
          </div>
          <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="yellow"
              className="min-w-[140px]"
              onClick={() => {
                onSign();
                onClose();
              }}
            >
              I Sign & Agree
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
