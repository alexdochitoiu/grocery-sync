export type ShoppingListItem = {
  name: string;
  quantity: string;
  unit: "pcs" | "kg" | "g";
  addedBy?: string;
};

export type CreateShoppingListFormData = {
  name: string;
  items: ShoppingListItem[];
};

export type CreateShoppingListBody = CreateShoppingListFormData & {
  createdBy: string;
};
