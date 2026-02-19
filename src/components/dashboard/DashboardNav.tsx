"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardNav({
  user,
}: {
  user: { email?: string | null; name?: string | null };
}) {
  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        My Bills
      </Link>
      <Link
        href="/dashboard/blogs/new"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Write blog
      </Link>
      <span className="text-sm text-muted-foreground">
        {user.name ?? user.email}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          signOut({
            callbackUrl: "https://www.billreliefai.com/",
            redirect: true,
          })
        }
      >
        Sign out
      </Button>
    </nav>
  );
}
