import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-14 min-h-[56px] items-center justify-between gap-2 px-4 sm:px-6 md:px-6 lg:px-8">
          <a
            href="https://www.billreliefai.com/"
            className="shrink-0 font-bold text-lg text-billrelief-blue hover:underline"
          >
            BillRelief
          </a>
          <DashboardNav user={session.user} />
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 md:px-6 md:py-8 lg:px-8">{children}</main>
    </div>
  );
}
