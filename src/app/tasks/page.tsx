import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export default function Page() {
  return (
    <div className="p-6">
      <PageTitle className="my-4" title="Available tasks" />
      <div className="mt-8 space-y-4">
        <Link href="/tasks/guess-the-word" className="block underline text-lg">
          Guess the word
        </Link>
        <Link
          href="/tasks/find-the-mistake"
          className="block underline text-lg"
        >
          Find the mistake
        </Link>
      </div>
    </div>
  );
}
