"use client";

import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  console.log({ session });

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
      <Logo />
      <nav className="space-x-4">
        {!session ? (
          <>
            <Link href="/register">
              <Button variant="link">Register</Button>
            </Link>
            <Link href="/login">
              <Button variant="primary">Login</Button>
            </Link>
          </>
        ) : (
          <>
            <Button variant="link">{session.user?.email}</Button>
            <Button variant="secondary" onClick={signOut}>
              Logout
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
