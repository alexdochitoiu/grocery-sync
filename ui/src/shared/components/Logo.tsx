import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-cyan-300 text-xl text-transparent bg-clip-text font-bold cursor-pointer"
    >
      🛒 GrocerySync
    </Link>
  );
}
