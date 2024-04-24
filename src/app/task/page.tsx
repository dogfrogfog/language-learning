"use client";

import { useState, useEffect } from "react";
import { localStorageKey } from "../constants";
import Form from "./Form";

export default function Page() {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const lsData = localStorage?.getItem(localStorageKey) || "{}";
    const words: string[] = JSON.parse(lsData)?.words || [];

    setWords(words);
  }, []);

  return (
    <div>
      <Form
        wordsOptions={words.map((v) => ({
          option3: v,
          option1: v + " option-2",
          option2: v + " option-3",
        }))}
      />
    </div>
  );
}
