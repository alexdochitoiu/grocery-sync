"use client";

import Title from "@/shared/components/Title";
import CreateShoppingListForm from "./CreateShoppingListForm";

export default function NewShoppingList() {
  return (
    <div className="flex flex-col items-center mt-16">
      <Title showBackButton>🛒 Create a new shopping list</Title>

      <CreateShoppingListForm />
    </div>
  );
}
