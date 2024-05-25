"use client";

import { useState, useContext } from "react";
import { toast } from "sonner";
import { validateWordInput } from "@/lib/utils";
import { DataContext } from "@/components/DataContext";

export default function InputWord() {
  const { words, addNewWord } = useContext(DataContext);
  const [wordInput, setWordInput] = useState<string>();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWordInput(e.target.value);
  };

  const handleSaveClick = () => {
    if (wordInput) {
      const normalizedWord = wordInput.toLowerCase().trim();
      const isValidated = validateWordInput(normalizedWord, words);

      if (isValidated) {
        addNewWord(normalizedWord);

        toast("Word is saved ✅");
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        onChange={handleInputChange}
        value={wordInput}
        name="word"
        placeholder="type the word"
        className="block border-2 border-black rounded text-lg p-2"
      />
      {wordInput && (
        <button onClick={handleSaveClick} className="p-2 rounded bg-green-300">
          save the word
        </button>
      )}
    </div>
  );
}
