type ShoppingListItem = {
  id: string;
  name: string;
  quantity: string;
  unit: "pcs" | "kg" | "g";
  status: "To Buy" | "Purchased" | "Not Found";
  addedBy?: string;
  completedBy?: string;
};

export type ShoppingList = {
  id: string;
  name: string;
  items: ShoppingListItem[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
};
