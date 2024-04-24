"use client";

import { localStorageKey } from "./constants";

export default function PasteArea() {
  const pasteFromClipboard = async () => {
    const clipboardData = await navigator.clipboard
      .readText()
      .then((text) => text);
    const currentSavedData = JSON.parse(
      localStorage.getItem(localStorageKey) || "{}"
    );
    const currentWords: string[] = currentSavedData?.words || [];
    const isWordAlreadySaved = currentWords.find((w) => w === clipboardData);

    if (isWordAlreadySaved || !clipboardData) return;

    const newSavedData = { words: currentWords.concat(clipboardData) };

    localStorage.setItem(localStorageKey, JSON.stringify(newSavedData));
  };

  return (
    <button
      onClick={pasteFromClipboard}
      className="self-bottom border-2 border-black text-center text-xl p-6 rounded-xl"
    >
      paste
    </button>
  );
}
