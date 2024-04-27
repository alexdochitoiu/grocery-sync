"use client";

import Alert from "@/shared/components/Alert";
import Button from "@/shared/components/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterFormData, RegisterSchema } from "@/shared/types/Register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push("/");
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
      <input
        type="password"
        {...register("confirmPassword")}
        required
        placeholder="Confirm password"
        className="input mb-2"
      />
      {Object.values(errors).length > 0 && (
        <Alert severity="error" className="my-2">
          {Object.values(errors).map((error) => error.message)[0]}
        </Alert>
      )}
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
  );
}
