import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
      <Logo />
      <nav className="space-x-4">
        <Link href="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Link href="/login">
          <Button variant="primary">Login</Button>
        </Link>
      </nav>
    </header>
  );
}
