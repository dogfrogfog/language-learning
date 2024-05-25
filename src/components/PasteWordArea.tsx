"use client";

import { useContext } from "react";
import { toast } from "sonner";
import { DataContext } from "@/components/DataContext";
import { validateWordInput } from "@/lib/utils";

export default function PasteWordArea() {
  const { words, addNewWord } = useContext(DataContext);

  const pasteFromClipboard = async () => {
    const clipboardData = await navigator.clipboard
      .readText()
      .then((text) => text.toLowerCase().trim());

    const isValidated = validateWordInput(clipboardData, words);

    if (isValidated) {
      addNewWord(clipboardData);

      toast("Word is saved ✅");
    }
  };

  return (
    <button
      onClick={pasteFromClipboard}
      className="w-full h-96 text-2xl self-bottom border-black border-2 bg-gradient-to-b from-white to-gray-300 shadow-xl text-center p-6 rounded"
    >
      paste copied text
    </button>
  );
}
