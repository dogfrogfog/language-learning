"use client";
import { toast } from "sonner";
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

    if (isWordAlreadySaved) {
      toast("Word is already saved 🚫");

      return;
    }

    if (!clipboardData) {
      toast("Copy word first");

      return;
    }

    console.log(!clipboardData.match(/[A-Za-z]/));

    if (!clipboardData.match(/^[A-Za-z]+$/g)) {
      toast("Only no-space english words allowed 🚫");

      return;
    }

    const newSavedData = {
      words: currentWords.concat(clipboardData.toLowerCase()),
    };

    localStorage.setItem(localStorageKey, JSON.stringify(newSavedData));
    toast("Word is saved ✅");
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
