import Link from "next/link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="font-bold text-xl text-primary hover:opacity-90"
          >
            BillRelief
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
