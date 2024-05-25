import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 p-3 bg-blue-300 flex justify-between">
      <div className="flex gap-4">
        <Link href="/" className="underline">
          home
        </Link>
        <Link href="/words" className="underline">
          words
        </Link>
        <Link href="/tasks" className="underline">
          tasks
        </Link>
      </div>
      <span>{"[name]"}</span>
    </header>
  );
}
