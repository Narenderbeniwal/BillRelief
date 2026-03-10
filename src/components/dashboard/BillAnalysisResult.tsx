"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  TrendingDown,
  FileText,
  Phone,
  Shield,
  ChevronDown,
  ChevronUp,
  DollarSign,
  AlertCircle,
  Clock,
} from "lucide-react";
import type { BillAnalysis } from "@/lib/bill-analyzer";

function CopyBlock({ content, label }: { content: string; label: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="absolute top-3 right-3 gap-1.5"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy {label}
          </>
        )}
      </Button>
      <pre className="whitespace-pre-wrap text-sm bg-muted/50 rounded-lg p-4 pr-28 border max-h-[400px] overflow-y-auto leading-relaxed">
        {content}
      </pre>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-orange-100 text-orange-800 border-orange-200",
    low: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${styles[severity] ?? styles.low}`}
    >
      {severity.toUpperCase()}
    </span>
  );
}

function CollapsibleSection({
  title,
  icon,
  defaultOpen = false,
  badge,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card>
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
            {badge}
          </div>
          {open ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      {open && <CardContent>{children}</CardContent>}
    </Card>
  );
}

export function BillAnalysisResult({
  analysis,
}: {
  analysis: BillAnalysis;
}) {
  const savingsPercent =
    analysis.totalBilled > 0
      ? Math.round((analysis.estimatedSavings / analysis.totalBilled) * 100)
      : 0;

  const highErrors = analysis.errors?.filter((e) => e.severity === "high") ?? [];
  const mediumErrors = analysis.errors?.filter((e) => e.severity === "medium") ?? [];
  const lowErrors = analysis.errors?.filter((e) => e.severity === "low") ?? [];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="border-[#0F4C81]/20 bg-gradient-to-br from-[#0F4C81]/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            Analysis Summary
          </CardTitle>
          {analysis.confidenceScore != null && (
            <CardDescription>
              AI confidence:{" "}
              <span className="font-semibold">
                {Math.round(analysis.confidenceScore * 100)}%
              </span>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{analysis.summary}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg bg-white border p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Total Billed
              </p>
              <p className="text-2xl font-bold mt-1">
                {formatCurrency(analysis.totalBilled)}
              </p>
            </div>
            <div className="rounded-lg bg-white border p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Fair Value
              </p>
              <p className="text-2xl font-bold mt-1 text-[#0F4C81]">
                {formatCurrency(analysis.estimatedFairValue)}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
              <p className="text-xs text-green-700 uppercase tracking-wide">
                Potential Savings
              </p>
              <p className="text-2xl font-bold mt-1 text-green-700">
                {formatCurrency(analysis.estimatedSavings)}
              </p>
              {savingsPercent > 0 && (
                <p className="text-xs text-green-600 mt-0.5">
                  {savingsPercent}% reduction
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Red Flags */}
      {analysis.redFlags?.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-red-800 font-semibold">
            <AlertTriangle className="h-5 w-5" />
            Critical Issues Found
          </div>
          <ul className="space-y-1">
            {analysis.redFlags.map((flag, i) => (
              <li
                key={i}
                className="text-sm text-red-700 flex items-start gap-2"
              >
                <span className="mt-0.5 shrink-0">•</span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Errors Detected */}
      {analysis.errors?.length > 0 && (
        <CollapsibleSection
          title="Billing Errors Detected"
          icon={<AlertCircle className="h-5 w-5 text-orange-600" />}
          defaultOpen={true}
          badge={
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-medium">
              {analysis.errors.length} issue{analysis.errors.length > 1 ? "s" : ""}
            </span>
          }
        >
          <div className="space-y-3">
            {[...highErrors, ...mediumErrors, ...lowErrors].map(
              (error, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-4 ${
                    error.severity === "high"
                      ? "border-red-200 bg-red-50/50"
                      : error.severity === "medium"
                        ? "border-orange-200 bg-orange-50/50"
                        : "border-yellow-200 bg-yellow-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <SeverityBadge severity={error.severity} />
                        <span className="text-xs font-medium text-muted-foreground uppercase">
                          {error.type.replace(/_/g, " ")}
                        </span>
                        {error.cptCode && (
                          <span className="text-xs text-muted-foreground">
                            CPT: {error.cptCode}
                          </span>
                        )}
                      </div>
                      <p className="text-sm">{error.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {error.recommendation}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-red-700">
                        {formatCurrency(error.impact)}
                      </p>
                      <p className="text-xs text-muted-foreground">impact</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* Line Items */}
      {analysis.lineItems?.length > 0 && (
        <CollapsibleSection
          title="Itemized Charges"
          icon={<DollarSign className="h-5 w-5 text-[#0F4C81]" />}
          defaultOpen={true}
          badge={
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
              {analysis.lineItems.length} items
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 pr-2">Description</th>
                  <th className="py-2 pr-2">Code</th>
                  <th className="py-2 pr-2 text-right">Qty</th>
                  <th className="py-2 pr-2 text-right">Charged</th>
                  <th className="py-2 pr-2 text-right">Fair Price</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {analysis.lineItems.map((item, i) => (
                  <tr
                    key={i}
                    className={`border-b ${item.isError ? "bg-orange-50/50" : ""}`}
                  >
                    <td className="py-2 pr-2">
                      <div>{item.description ?? "—"}</div>
                      {item.isError && item.errorExplanation && (
                        <p className="text-xs text-orange-700 mt-0.5">
                          {item.errorExplanation}
                        </p>
                      )}
                    </td>
                    <td className="py-2 pr-2 text-muted-foreground">
                      {item.cptCode ?? item.icd10Code ?? "—"}
                    </td>
                    <td className="py-2 pr-2 text-right">{item.quantity}</td>
                    <td className="py-2 pr-2 text-right">
                      {formatCurrency(item.totalCharge)}
                    </td>
                    <td className="py-2 pr-2 text-right">
                      {item.fairPrice != null
                        ? formatCurrency(item.fairPrice)
                        : "—"}
                    </td>
                    <td className="py-2">
                      {item.isError ? (
                        <span className="inline-flex items-center gap-1 text-orange-700 text-xs font-medium">
                          <AlertTriangle className="h-3 w-3" />
                          {item.errorType?.replace(/_/g, " ") ?? "Error"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-green-700 text-xs font-medium">
                          <CheckCircle2 className="h-3 w-3" />
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>
      )}

      {/* Next Actions */}
      {analysis.nextActions?.length > 0 && (
        <CollapsibleSection
          title="Recommended Next Steps"
          icon={<Clock className="h-5 w-5 text-blue-600" />}
          defaultOpen={true}
        >
          <ol className="space-y-3">
            {analysis.nextActions
              .sort((a, b) => a.priority - b.priority)
              .map((action, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-[#0F4C81] text-white text-xs font-bold shrink-0">
                    {action.priority}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{action.title}</p>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {action.timeframe}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {action.description}
                    </p>
                  </div>
                </li>
              ))}
          </ol>
        </CollapsibleSection>
      )}

      {/* Dispute Letter Template */}
      {analysis.disputeTemplate && (
        <CollapsibleSection
          title="Dispute Letter Template"
          icon={<FileText className="h-5 w-5 text-purple-600" />}
          defaultOpen={false}
        >
          <CardDescription className="mb-3">
            Copy this letter, fill in your personal details, and send it to the billing department via certified mail.
          </CardDescription>
          <CopyBlock content={analysis.disputeTemplate} label="letter" />
        </CollapsibleSection>
      )}

      {/* Negotiation Script */}
      {analysis.negotiationScript && (
        <CollapsibleSection
          title="Phone Negotiation Script"
          icon={<Phone className="h-5 w-5 text-teal-600" />}
          defaultOpen={false}
        >
          <CardDescription className="mb-3">
            Use this script when calling the billing department. Stay calm and refer to your documented findings.
          </CardDescription>
          <CopyBlock content={analysis.negotiationScript} label="script" />
        </CollapsibleSection>
      )}

      {/* Patient Rights */}
      {analysis.patientRights?.length > 0 && (
        <CollapsibleSection
          title="Your Patient Rights"
          icon={<Shield className="h-5 w-5 text-[#0F4C81]" />}
          defaultOpen={false}
        >
          <ul className="space-y-2">
            {analysis.patientRights.map((right, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-[#0F4C81] shrink-0 mt-0.5" />
                <span>{right}</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}
    </div>
  );
}
