import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import { CreateShoppingListBody } from "@/shared/types/ShoppingLists";
import {
  createShoppingList,
  getShoppingLists,
} from "@/shared/database/services/shoppingList";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as CreateShoppingListBody;

    await createShoppingList({
      id: uuidv4(),
      name: body.name,
      items: body.items.map((item) => ({
        id: uuidv4(),
        ...item,
        status: "To Buy",
        addedBy: item.addedBy,
      })),
      createdBy: body.createdBy,
      createdAt: Date.now().toString(),
    });

    return NextResponse.json(
      { message: "Shopping list sucessfully created!" },
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

export async function GET(): Promise<NextResponse> {
  try {
    const response = await getShoppingLists();
    return NextResponse.json({ shoppingLists: response }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
