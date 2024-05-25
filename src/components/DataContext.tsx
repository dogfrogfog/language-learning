"use client";

import { createContext, useEffect, useState } from "react";
import { localStorageKey } from "@/app/constants";

export const DataContext = createContext<{
  words: string[];
  clearWords: () => void;
  addNewWord: (newWord: string) => void;
}>({
  words: [],
  clearWords: () => {},
  addNewWord: () => {},
});

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const lsData = localStorage?.getItem(localStorageKey) || "{}";
    const words: string[] = JSON.parse(lsData)?.words || [];

    setWords(words);
  }, []);

  const clearWords = () => {
    localStorage.setItem(localStorageKey, "{}");

    setWords([]);
  };

  const addNewWord = (newWord: string) => {
    const newWords = words.concat([newWord]);

    localStorage.setItem(localStorageKey, JSON.stringify({ words: newWords }));

    setWords(newWords);
  };

  return (
    <DataContext.Provider value={{ words, clearWords, addNewWord }}>
      {children}
    </DataContext.Provider>
  );
}
