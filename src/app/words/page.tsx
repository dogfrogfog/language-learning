"use client";

import { useContext } from "react";
import { DataContext } from "@/components/DataContext";

import PageTitle from "@/components/PageTitle";

export default function Page() {
  const { words, clearWords } = useContext(DataContext);

  return (
    <div className="p-6">
      <div className="flex justify-between my-4">
        <PageTitle title={`List of words (${words.length})`} />
        <button
          className="bg-red-500 px-2 rounded font-bold text-white"
          onClick={() => clearWords()}
        >
          delete words
        </button>
      </div>
      <div className="mt-8 space-y-4">
        {words.map((v) => (
          <p key={v} className="text-lg">
            {v}
          </p>
        ))}
      </div>
    </div>
  );
}
