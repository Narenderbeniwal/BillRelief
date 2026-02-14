"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { MedicalBill, BillLineItem, AiAnalysisResult } from "@prisma/client";

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

export function BillDetailClient({ bill }: { bill: BillWithRelations }) {
  const totalAmount = bill.totalAmount != null ? Number(bill.totalAmount) : null;
  const estimatedSavings = bill.estimatedSavings != null ? Number(bill.estimatedSavings) : null;
  const errorsCount = bill.lineItems.filter((i) => i.isError).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>
            {bill.providerName ?? bill.fileName ?? "Medical Bill"}
          </CardTitle>
          <span
            className={`text-sm px-3 py-1 rounded-full ${
              bill.status === "completed"
                ? "bg-green-100 text-green-800"
                : bill.status === "analyzing"
                ? "bg-blue-100 text-blue-800"
                : bill.status === "failed"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {statusLabels[bill.status] ?? bill.status}
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
            {totalAmount != null && (
              <div>
                <p className="text-muted-foreground">Total amount</p>
                <p className="font-bold text-lg">{formatCurrency(totalAmount)}</p>
              </div>
            )}
            {estimatedSavings != null && estimatedSavings > 0 && (
              <div>
                <p className="text-muted-foreground">Estimated savings</p>
                <p className="font-bold text-lg text-green-600">
                  {formatCurrency(estimatedSavings)}
                </p>
              </div>
            )}
          </div>
            {bill.status === "analyzing" && (
            <p className="text-sm text-muted-foreground">
              Please wait 5 to 6 hours. We will share the complete report within the next 5 to 6 hours on your email.
            </p>
          )}
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

      {errorsCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Errors detected</CardTitle>
            <CardDescription>
              Our AI found {errorsCount} potential billing error(s). These can often be disputed for a lower amount.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {bill.lineItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Line items</CardTitle>
            <CardDescription>Charges and AI-identified issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Description</th>
                    <th className="text-left py-2">Code</th>
                    <th className="text-right py-2">Qty</th>
                    <th className="text-right py-2">Charge</th>
                    {bill.lineItems.some((i) => i.isError) && (
                      <th className="text-left py-2">Issue</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {bill.lineItems.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b ${item.isError ? "bg-orange-50/50" : ""}`}
                    >
                      <td className="py-2">{item.description ?? "—"}</td>
                      <td className="py-2">{item.cptCode ?? item.icd10Code ?? "—"}</td>
                      <td className="text-right py-2">{item.quantity}</td>
                      <td className="text-right py-2">
                        {item.totalCharge != null
                          ? formatCurrency(Number(item.totalCharge))
                          : "—"}
                      </td>
                      {bill.lineItems.some((i) => i.isError) && (
                        <td className="py-2">
                          {item.isError ? (
                            <span className="text-orange-700 font-medium">
                              {item.errorType ?? "Error"} — Fair:{" "}
                              {item.fairPrice != null
                                ? formatCurrency(Number(item.fairPrice))
                                : "—"}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
