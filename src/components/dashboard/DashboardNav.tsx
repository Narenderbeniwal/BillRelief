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
    <nav className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-4">
      <Link
        href="/dashboard"
        className="min-h-[44px] shrink-0 px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center"
      >
        My Bills
      </Link>
      <Link
        href="/dashboard/blogs/new"
        className="min-h-[44px] shrink-0 px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center whitespace-nowrap"
      >
        Write blog
      </Link>
      <span className="hidden truncate text-sm text-muted-foreground sm:inline-block max-w-[120px] lg:max-w-[180px]" title={user.name ?? user.email ?? ""}>
        {user.name ?? user.email}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="min-h-[44px] shrink-0"
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
