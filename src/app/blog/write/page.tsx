import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { BlogWriteClient } from "@/components/blog-platform/BlogWriteClient";

export default async function BlogWritePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/blog/write");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <BlogWriteClient />
      </main>
    </div>
  );
}
