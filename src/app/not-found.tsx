import Link from "next/link";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-[#0F4C81]">404</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-900">
            Page not found
          </h2>
          <p className="mt-2 text-muted-foreground">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="yellow" size="lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/get-started">Get started</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter className="border-gray-200 bg-white py-6 pb-8" />
    </div>
  );
}
