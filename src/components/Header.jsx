import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex p-2">
        <Link
          className="p-6 text-(--link-colour) hover:bg-(--accent-colour)"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="p-6 text-(--link-colour) hover:bg-(--accent-colour)"
          href={"/posts"}
        >
          Posts
        </Link>
      </nav>
    </header>
  );
}
