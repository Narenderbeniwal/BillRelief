"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { MedicalBill, BillStatus } from "@prisma/client";

type BillWithCount = MedicalBill & { _count: { lineItems: number } };

const statusLabels: Record<BillStatus, string> = {
  pending: "Pending",
  analyzing: "Analyzing",
  completed: "Completed",
  failed: "Failed",
};

export function DashboardClient({
  initialBills,
}: {
  initialBills: BillWithCount[];
}) {
  const { data: bills = initialBills } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const res = await fetch("/api/bills");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<BillWithCount[]>;
    },
    initialData: initialBills,
  });

  if (bills.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bills.map((bill) => (
        <Link key={bill.id} href={`/dashboard/bills/${bill.id}`}>
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <span className="text-sm font-medium truncate">
                {bill.providerName ?? bill.fileName ?? "Medical Bill"}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  bill.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : bill.status === "analyzing"
                    ? "bg-blue-100 text-blue-800"
                    : bill.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {statusLabels[bill.status]}
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {bill.totalAmount != null
                  ? formatCurrency(Number(bill.totalAmount))
                  : "—"}
              </p>
              {bill.estimatedSavings != null && Number(bill.estimatedSavings) > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  Est. savings: {formatCurrency(Number(bill.estimatedSavings))}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Uploaded {formatDate(bill.uploadDate)}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
