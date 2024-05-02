import { ShoppingList } from "@/shared/database/types/ShoppingList";
import Button from "./Button";
import { useMemo } from "react";

export default function ShoppingListCard({
  shoppingList,
}: {
  shoppingList: ShoppingList;
}) {
  const purchasedCount = useMemo(
    () =>
      shoppingList.items.filter((item) => item.status === "Purchased").length,
    [shoppingList.items]
  );

  const notFoundCount = useMemo(
    () =>
      shoppingList.items.filter((item) => item.status === "Not Found").length,
    [shoppingList.items]
  );

  const toBuyCount = useMemo(
    () =>
      shoppingList.items.filter((item) => item.status === "To Buy").length,
    [shoppingList.items]
  );

  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-[600px]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{shoppingList.name}</h2>
        <p className="text-xs text-gray-400 text-right">
          Created on <br />
          {new Date(parseInt(shoppingList.createdAt)).toLocaleString()}
        </p>
      </div>
      <p className="text-gray-600">{shoppingList.items.length} items</p>
      <p className="text-gray-500 text-sm">
        ({purchasedCount} ✅ Purchased | {notFoundCount} ❌ Not found | {toBuyCount} 🔜 To buy)
      </p>
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-gray-400 text-right">
          {shoppingList.updatedAt
            ? `Updated on ${new Date(parseInt(shoppingList.updatedAt)).toLocaleString()}`
            : ""}
        </p>
        <Button variant="primary">View</Button>
      </div>
    </div>
  );
}
