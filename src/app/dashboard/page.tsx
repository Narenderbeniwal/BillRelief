import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const bills = await prisma.medicalBill.findMany({
    where: { userId: session.user.id },
    orderBy: { uploadDate: "desc" },
    include: {
      _count: { select: { lineItems: true } },
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Bills</h1>
          <p className="text-muted-foreground">
            Upload and track your medical bill analyses.
          </p>
        </div>
        <Button asChild variant="yellow">
          <Link href="/dashboard/upload">Upload a Bill</Link>
        </Button>
      </div>
      <DashboardClient initialBills={bills} />
      {bills.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No bills yet</CardTitle>
            <CardDescription>
              Upload your first medical bill to get an AI-powered analysis and estimated savings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="yellow">
              <Link href="/dashboard/upload">Upload Your First Bill</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
