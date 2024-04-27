import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { UserRegisterDto } from "@/shared/types/UserRegisterDto";
import { ZodError, z } from "zod";

dotenv.config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as UserRegisterDto;

    schema.parse(body);

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
