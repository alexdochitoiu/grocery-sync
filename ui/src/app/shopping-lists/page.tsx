import Title from "@/shared/components/Title";
import ShoppingLists from "./ShoppingLists";

export default function ShoppingListsPage() {
  return (
    <div className="flex flex-col items-center mt-16">
      <Title showBackButton>📋 View your shopping lists</Title>

      <ShoppingLists />
    </div>
  );
}
