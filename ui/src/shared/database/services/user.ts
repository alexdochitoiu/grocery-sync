import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "../types/User";
import getDynamoDBDocClient from "../getDynamoDBDocClient";

const docClient = getDynamoDBDocClient();

async function getUserByEmail(email?: string): Promise<User | undefined> {
  if (!email) {
    return undefined;
  }

  const command = new GetCommand({
    TableName: "users",
    Key: { email },
  });

  const response = await docClient.send(command);
  const user = response.Item;

  return user as User;
}

async function createUser(user: User): Promise<void> {
  const command = new PutCommand({
    TableName: "users",
    Item: user,
  });

  await docClient.send(command);
}

export { getUserByEmail, createUser };
