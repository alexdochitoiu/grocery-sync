"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

type TitleProps = {
  children: React.ReactNode;
  showBackButton?: boolean;
};

export default function Title({ children, showBackButton }: TitleProps) {
  const router = useRouter();

  return (
    <div className="w-[600px] flex items-center">
      {showBackButton && (
        <Button
          variant="link"
          className="justify-start"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
      )}
      <h1 className="title text-center flex-1 my-4">{children}</h1>
    </div>
  );
}
