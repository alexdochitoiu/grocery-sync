"use client";

import Button from "@/shared/components/Button";
import Link from "next/link";
import { FormEvent } from "react";

export default function Register() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="title my-4">Sign up</h1>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="input mb-2"
        />
        <div className="flex items-center justify-between">
          <Link href="/login" className="link text-sm">
            Already have an account?
            <br /> Login
          </Link>
          <Button type="submit" variant="primary" className="my-2">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
