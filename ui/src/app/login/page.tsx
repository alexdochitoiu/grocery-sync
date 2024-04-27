"use client";

import Button from "@/shared/components/Button";
import Link from "next/link";
import { FormEvent } from "react";

export default function Login() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="title my-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-[350px]">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input mb-2"
        />
        <div className="flex items-center justify-between">
          <Link href="/forgot-password" className="link text-sm">
            Forgot password?
          </Link>
          <Button type="submit" variant="primary" className="my-2">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
