"use client";

import { useEffect, useState } from "react";
import { ShoppingList } from "@/shared/database/types/ShoppingList";
import Title from "@/shared/components/Title";
import ShoppingListsPageLoading from "../loading";

type ShoppingListProps = {
  params: {
    id: string;
  };
};

export default function ShoppingListPage({ params }: ShoppingListProps) {
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);

  useEffect(() => {
    fetch(`/api/shopping-lists/${params.id}`)
      .then((response) => response.json())
      .then((data) => setShoppingList(data));
  }, [params.id]);

  if (!shoppingList) {
    return <ShoppingListsPageLoading />;
  }

  return (
    <div className="flex flex-col items-center mt-16">
      <Title showBackButton>📋 {shoppingList?.name}</Title>

      {JSON.stringify(shoppingList, null, 2)}
    </div>
  );
}
