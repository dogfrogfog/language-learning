"use client";
import { useRouter } from "next/navigation";

import { localStorageKey } from "@/app/constants";
import { useEffect, useState } from "react";
import PasteArea from "../PasteArea";

export default function WordsList() {
  const [words, setWords] = useState<string[]>([]);
  const router = useRouter();

  const handleClearClick = () => {
    localStorage.setItem(localStorageKey, "{}");

    setWords([]);
    router.refresh();
  };

  useEffect(() => {
    const lsData = localStorage?.getItem(localStorageKey) || "{}";
    const words: string[] = JSON.parse(lsData)?.words || [];

    setWords(words);
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-end gap-3">
        {/* <PasteArea /> */}
        <button
          className="bg-red-200 rounded-xl p-3"
          onClick={handleClearClick}
        >
          clear words
        </button>
      </div>
      <div className="space-y-6">
        {words.map((w) => (
          <div
            className="text-center text-xl border-2 p-3 border-black rounded-xl"
            key={w}
          >
            {w}
          </div>
        ))}
      </div>
    </div>
  );
}
