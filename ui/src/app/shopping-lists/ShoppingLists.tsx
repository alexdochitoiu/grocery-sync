"use client";

import ShoppingListCard from "@/shared/components/ShoppingListCard";
import { ShoppingList } from "@/shared/database/types/ShoppingList";
import { useEffect, useState } from "react";

export default function ShoppingLists() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

  useEffect(() => {
    fetch("/api/shopping-lists")
      .then((response) => response.json())
      .then((data) => setShoppingLists(data.shoppingLists));
  }, []);

  return (
    <div className="grid gap-4 my-6">
      {shoppingLists.map((shoppingList) => (
        <ShoppingListCard key={shoppingList.id} shoppingList={shoppingList} />
      ))}
    </div>
  );
}
