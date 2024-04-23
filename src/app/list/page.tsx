import Link from "next/link";
import WordsList from "./WordsList";

export default function Page() {
  return (
    <main className="space-y-12 min-h-screen p-3">
      <div className="flex justify-around w-full text-center text-xl p-6">
        <Link href="/" className="bg-slate-700 text-white">
          {"<"} Back
        </Link>
        List of words
      </div>

      <WordsList />
    </main>
  );
}
