import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NewBlogForm } from "@/components/blog/NewBlogForm";

export default async function NewBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard/blogs/new");

  return <NewBlogForm />;
}

