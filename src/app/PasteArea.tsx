"use client";

import { useContext } from "react";
import { toast } from "sonner";
import { DataContext } from "@/components/DataContext";

export default function PasteArea() {
  const { words, addNewWord } = useContext(DataContext);

  const pasteFromClipboard = async () => {
    const clipboardData = await navigator.clipboard
      .readText()
      .then((text) => text.toLowerCase().trim());

    if (!clipboardData) {
      toast("Copy word first");

      return;
    }

    if (!clipboardData.match(/^[A-Za-z]+$/g)) {
      toast("Only no-space english words allowed 🚫");

      return;
    }

    const isWordAlreadySaved = words.find((w) => w === clipboardData);

    if (isWordAlreadySaved) {
      toast("Word is already saved 🚫");

      return;
    }

    addNewWord(clipboardData);

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
