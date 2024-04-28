import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { RegisterSchema, RegisterFormData } from "@/shared/types/Register";
import { ZodError } from "zod";
import { createUser } from "@/shared/database/services/user";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as RegisterFormData;

    RegisterSchema.parse(body);

    const hashedPassword = await hash(body.password, 10);

    await createUser({
      id: uuidv4(),
      email: body.email,
      hashedPassword,
    });

    return NextResponse.json(
      { message: "User successfully registered!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => err.message);
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
