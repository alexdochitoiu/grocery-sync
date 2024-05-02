import CardButton from "@/shared/components/CardButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="title my-4">Welcome to GrocerySync!</h1>

      <div className="grid gap-4 my-6">
        <Link href="/shopping-lists/new">
          <CardButton
            icon="🛒"
            title="Create a new shopping list"
            description="Start a new shopping list and add items to it. Invite your family members or friends to collaborate!"
          />
        </Link>
        <Link href="/shopping-lists">
          <CardButton
            icon="📋"
            title="View your shopping lists"
            description="View all your shopping lists and see the items in each list. You can copy them to a new list or delete them."
          />
        </Link>
        <Link href="/shopping-lists/shared">
          <CardButton
            icon="🗣"
            title="View shared shopping lists"
            description="View all the shopping lists that have been shared with you. See the items in each list and manage them as needed."
          />
        </Link>
      </div>
    </div>
  );
}
