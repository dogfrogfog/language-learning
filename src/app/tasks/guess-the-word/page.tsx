"use client";

import { useState, useEffect } from "react";
import { WordData, getWordsOptions } from "@/app/actions";
import { localStorageKey } from "@/app/constants";
import Form from "@/components/TaskOneForm";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [words, setWords] = useState<string[]>([]);
  const [formWordsData, setFormWordsData] = useState<string>(`[]`);

  useEffect(() => {
    const lsData = localStorage?.getItem(localStorageKey) || "{}";
    const words: string[] = JSON.parse(lsData)?.words || [];

    setWords(words);

    if (
      navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
      navigator.userAgent.match(/Android/i)
    )
      setIsMobile(true);
  }, []);

  const isProd = process.env.NODE_ENV === "production";

  return (
    <div className="p-6 space-y-6">
      <PageTitle className="my-4" title="Guess the word" />
      {(isProd ? isMobile : true) && !JSON.parse(formWordsData).length ? (
        <button
          disabled={isLoading}
          onClick={async () => {
            if (isLoading) return;

            setIsLoading(true);
            try {
              const { wordsData } = await getWordsOptions(words.join(","));

              console.log("data from request");
              console.log(wordsData);

              setFormWordsData(JSON.stringify(wordsData, null, 2));
            } catch (e) {
              console.log(e);
            } finally {
              setIsLoading(false);
            }
          }}
          className="max-h-24 bg-green-400 mt-10 rounded p-4 font-bold text-xl disabled:opacity-50"
        >
          Generate words
        </button>
      ) : (
        <Form
          setFormWordsData={setFormWordsData}
          wordsData={(JSON.parse(formWordsData) as WordData[]).map((v, i) => ({
            value: words[i],
            ...v,
          }))}
        />
      )}

      {isProd && !isMobile && (
        <div className="font-bold">Install PWA through the browser</div>
      )}
    </div>
  );
}
