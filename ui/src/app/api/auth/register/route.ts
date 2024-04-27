import { hash } from "bcrypt";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function POST(request: Request): Promise<Response> {
  try {
    const { email, password, confirmPassword } = await request.json();
    if (password !== confirmPassword) {
      return new Response("Passwords do not match!", { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const command = new PutCommand({
      TableName: "users",
      Item: {
        id: uuidv4(),
        email,
        hashedPassword,
      },
    });

    const response = await docClient.send(command);
    console.log(response);

    return new Response("User registered with success!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Bad request!", { status: 400 });
  }
}
