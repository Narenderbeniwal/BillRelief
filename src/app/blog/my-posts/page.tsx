import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { MyPostsClient } from "@/components/blog-platform/MyPostsClient";

export default async function MyPostsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/blog/my-posts");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <MyPostsClient />
      </main>
    </div>
  );
}
