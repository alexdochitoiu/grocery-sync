import { getShoppingListById } from "@/shared/database/services/shoppingList";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  request: Request,
  context: { params: Params }
): Promise<NextResponse> {
  try {
    const response = await getShoppingListById(context.params.id);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
