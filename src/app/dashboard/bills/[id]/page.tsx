import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BillDetailClient } from "@/components/dashboard/BillDetailClient";

export default async function BillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/dashboard");
  const { id } = await params;

  const bill = await prisma.medicalBill.findFirst({
    where: { id, userId: session.user.id },
    include: {
      lineItems: true,
      aiAnalysisResults: true,
    },
  });

  if (!bill) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>
      </Button>
      <BillDetailClient bill={bill} />
    </div>
  );
}
