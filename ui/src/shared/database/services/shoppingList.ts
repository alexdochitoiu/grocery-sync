import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ShoppingList } from "../types/ShoppingList";
import getDynamoDBDocClient from "../getDynamoDBDocClient";

const docClient = getDynamoDBDocClient();

export async function createShoppingList(shoppingList: ShoppingList): Promise<void> {
  const command = new PutCommand({
    TableName: "shoppingLists",
    Item: shoppingList,
  });

  await docClient.send(command);
}

export async function getShoppingLists(): Promise<ShoppingList[]> {
  const command = new ScanCommand({
    TableName: "shoppingLists",
  });

  const response = await docClient.send(command);

  return response.Items as ShoppingList[];
}

export async function getShoppingListById(id: string): Promise<ShoppingList> {
  const command = new GetCommand({
    TableName: "shoppingLists",
    Key: { id },
  });

  const response = await docClient.send(command);

  return response.Item as ShoppingList;
}