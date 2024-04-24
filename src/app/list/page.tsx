import Link from "next/link";
import WordsList from "./WordsList";

export default function Page() {
  return (
    <main className="space-y-12 min-h-screen p-3 flex flex-col justify-between">
      <div>
        <div className="flex justify-around w-full text-center text-xl p-6">
          <Link href="/" className="bg-slate-700 text-white">
            {"<"} Back
          </Link>
          List of words
        </div>

        <WordsList />
      </div>

      <div className="p-10 flex justify-center">
        <Link
          href="/task"
          className="px-5 py-2 text-xl bg-yellow-400 rounded-md"
        >
          Start exercise with saved words
        </Link>
      </div>
    </main>
  );
}
