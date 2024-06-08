"use client";

import { useState, useContext } from "react";
import { FindTheMistakeData, getFindTheMistakeData } from "@/app/actions";
import FindTheMistakeForm from "@/components/tasksForms/FindTheMistakeForm";
import PageTitle from "@/components/PageTitle";
import { DataContext } from "@/components/DataContext";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const { words } = useContext(DataContext);
  const [generatedData, setGeneratedData] = useState<FindTheMistakeData[]>([]);

  return (
    <div className="p-6 space-y-6">
      <PageTitle className="my-4" title="Find the mistake" />
      {generatedData.length === 0 ? (
        <button
          disabled={isLoading}
          onClick={async () => {
            if (isLoading) return;

            setIsLoading(true);
            try {
              const { data } = await getFindTheMistakeData(words.join(","));

              console.log(data);

              setGeneratedData(data);
            } catch (e) {
              console.log(e);
            } finally {
              setIsLoading(false);
            }
          }}
          className="max-h-24 bg-green-400 mt-10 rounded p-4 font-bold text-xl disabled:opacity-50"
        >
          Start
        </button>
      ) : (
        <FindTheMistakeForm
        // wordsData={generatedData.map((v, i) => ({
        //   value: words[i],
        //   ...v,
        // }))}
        />
      )}
    </div>
  );
}
