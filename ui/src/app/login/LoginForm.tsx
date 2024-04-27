"use client";

import Alert from "@/shared/components/Alert";
import Button from "@/shared/components/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginSchema } from "@/shared/types/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[350px]">
      <input
        type="email"
        {...register("email")}
        required
        placeholder="Email"
        className="input mb-2"
      />
      <input
        type="password"
        {...register("password")}
        required
        placeholder="Password"
        className="input mb-2"
      />
      {Object.values(errors).length > 0 && (
        <Alert severity="error" className="my-2">
          {Object.values(errors).map((error) => error.message)[0]}
        </Alert>
      )}
      <div className="flex items-center justify-between">
        <Link href="/forgot-password" className="link text-sm">
          Forgot password?
        </Link>
        <Button type="submit" variant="primary" className="my-2">
          Login
        </Button>
      </div>
    </form>
  );
}
