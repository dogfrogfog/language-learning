import Link from "next/link";
import PasteArea from "./PasteArea";

export default function Page() {
  return (
    <main className="min-h-screen p-3 flex items-center justify-center gap-6">
      <Link href="/words" className="w-full">
        <div className="text-center text-xl p-6 bg-slate-200 rounded-xl">
          Go to list of saved words
        </div>
      </Link>
      <PasteArea />
    </main>
  );
}
