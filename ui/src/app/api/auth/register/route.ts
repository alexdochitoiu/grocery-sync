import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { RegisterSchema, RegisterFormData } from "@/shared/types/Register";
import { ZodError, z } from "zod";
import getDynamoDBDocClient from "../../getDynamoDBDocClient";

const docClient = getDynamoDBDocClient();

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as RegisterFormData;

    RegisterSchema.parse(body);

    const hashedPassword = await hash(body.password, 10);

    const command = new PutCommand({
      TableName: "users",
      Item: {
        id: uuidv4(),
        email: body.email,
        hashedPassword,
      },
    });

    const response = await docClient.send(command);
    console.log(response);

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
