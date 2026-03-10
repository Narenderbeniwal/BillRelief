"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FileText, Loader2, AlertTriangle, RotateCcw, Upload, FileWarning } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BillAnalysisResult } from "./BillAnalysisResult";
import type { MedicalBill, BillLineItem, AiAnalysisResult } from "@prisma/client";
import type { BillAnalysis } from "@/lib/bill-analyzer";

type BillWithRelations = MedicalBill & {
  lineItems: BillLineItem[];
  aiAnalysisResults: AiAnalysisResult[];
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  analyzing: "Analyzing",
  completed: "Completed",
  failed: "Failed",
};

const PROGRESS_STEPS: Record<string, number> = {
  "Reading your bill...": 15,
  "Extracting content from your document...": 35,
  "Analyzing your bill with AI — checking for errors, overcharges, and savings opportunities...": 60,
  "Saving analysis results...": 90,
};

export function BillDetailClient({ bill }: { bill: BillWithRelations }) {
  const totalAmount =
    bill.totalAmount != null ? Number(bill.totalAmount) : null;
  const estimatedSavings =
    bill.estimatedSavings != null ? Number(bill.estimatedSavings) : null;

  const existingAnalysis =
    bill.status === "completed" && bill.aiAnalysisResults[0]?.analysisJson
      ? (bill.aiAnalysisResults[0].analysisJson as unknown as BillAnalysis)
      : null;

  const [analysis, setAnalysis] = useState<BillAnalysis | null>(
    existingAnalysis
  );
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string>("");
  const [isNotMedicalBill, setIsNotMedicalBill] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const needsAnalysis =
    !analysis && (bill.status === "pending" || bill.status === "analyzing");

  useEffect(() => {
    if (!needsAnalysis) return;

    startAnalysis();

    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsAnalysis]);

  function startAnalysis() {
    setIsAnalyzing(true);
    setError("");
    setProgress(5);
    setStatusMessage("Connecting to analysis service...");

    const es = new EventSource(`/api/bills/${bill.id}/analyze`);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        switch (payload.type) {
          case "status":
            setStatusMessage(payload.message);
            setProgress(PROGRESS_STEPS[payload.message] ?? progress);
            break;
          case "result":
            setAnalysis(payload.data as BillAnalysis);
            setProgress(100);
            setStatusMessage("Analysis complete!");
            break;
          case "error":
            setError(payload.message);
            if (payload.notMedicalBill) setIsNotMedicalBill(true);
            setIsAnalyzing(false);
            es.close();
            break;
          case "done":
            setIsAnalyzing(false);
            es.close();
            break;
        }
      } catch {
        // Ignore malformed events
      }
    };

    es.onerror = () => {
      if (!analysis && !error) {
        setError(
          "Connection lost. The analysis may still be running — please refresh in a moment."
        );
      }
      setIsAnalyzing(false);
      es.close();
    };
  }

  function handleRetry() {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
    setAnalysis(null);
    setError("");
    setIsNotMedicalBill(false);
    setProgress(0);
    startAnalysis();
  }

  const currentStatus = isAnalyzing
    ? "analyzing"
    : analysis
      ? "completed"
      : error
        ? "failed"
        : bill.status;

  return (
    <div className="space-y-6">
      {/* Bill Header Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>
            {bill.providerName ?? bill.fileName ?? "Medical Bill"}
          </CardTitle>
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              currentStatus === "completed"
                ? "bg-green-100 text-green-800"
                : currentStatus === "analyzing"
                  ? "bg-blue-100 text-blue-800"
                  : currentStatus === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
            }`}
          >
            {statusLabels[currentStatus] ?? currentStatus}
          </span>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Uploaded</p>
              <p className="font-medium">{formatDate(bill.uploadDate)}</p>
            </div>
            {bill.billDate && (
              <div>
                <p className="text-muted-foreground">Bill date</p>
                <p className="font-medium">{formatDate(bill.billDate)}</p>
              </div>
            )}
            {(totalAmount != null || analysis?.totalBilled != null) && (
              <div>
                <p className="text-muted-foreground">Total amount</p>
                <p className="font-bold text-lg">
                  {formatCurrency(
                    analysis?.totalBilled ?? totalAmount ?? 0
                  )}
                </p>
              </div>
            )}
            {(estimatedSavings != null ||
              (analysis?.estimatedSavings ?? 0) > 0) && (
              <div>
                <p className="text-muted-foreground">Estimated savings</p>
                <p className="font-bold text-lg text-green-600">
                  {formatCurrency(
                    analysis?.estimatedSavings ?? estimatedSavings ?? 0
                  )}
                </p>
              </div>
            )}
          </div>
          {bill.fileUrl && (
            <p className="text-sm">
              <Link
                href={`/api/bills/${bill.id}/file`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[#0F4C81] hover:underline"
              >
                <FileText className="h-4 w-4" />
                View uploaded file
              </Link>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-[#0F4C81]" />
              <div className="flex-1">
                <p className="text-sm font-medium">{statusMessage}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This typically takes 15–30 seconds
                </p>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Not a Medical Bill */}
      {isNotMedicalBill && error && !isAnalyzing && (
        <Card className="border-amber-300 bg-amber-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileWarning className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-3">
                <p className="text-base font-semibold text-amber-900">
                  This doesn&apos;t appear to be a medical bill
                </p>
                <p className="text-sm text-amber-800">{error}</p>
                <div className="rounded-lg bg-white/70 border border-amber-200 p-3 space-y-1">
                  <p className="text-sm font-medium text-amber-900">
                    We can analyze these types of documents:
                  </p>
                  <ul className="text-sm text-amber-800 list-disc list-inside space-y-0.5">
                    <li>Hospital or clinic billing statements</li>
                    <li>Explanation of Benefits (EOB) from insurance</li>
                    <li>Itemized medical invoices</li>
                    <li>Emergency room bills</li>
                    <li>Lab, imaging, or specialist bills</li>
                  </ul>
                </div>
                <Button variant="outline" size="sm" asChild className="gap-1.5">
                  <Link href="/dashboard/upload">
                    <Upload className="h-3.5 w-3.5" />
                    Upload a medical bill
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* General Error State */}
      {error && !isNotMedicalBill && !isAnalyzing && (
        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-red-800">
                  Analysis failed
                </p>
                <p className="text-sm text-red-700">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retry analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && <BillAnalysisResult analysis={analysis} />}
    </div>
  );
}
