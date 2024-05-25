import { toast } from "sonner";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateWordInput(word: string, savedWords: string[]) {
  if (!word) {
    toast("Copy word first");

    return false;
  }

  if (!word.match(/^[A-Za-z]+$/g)) {
    toast("Only no-space english words allowed 🚫");

    return false;
  }

  const isWordAlreadySaved = savedWords.find((w) => w === word);

  if (isWordAlreadySaved) {
    toast("Word is already saved 🚫");

    return false;
  }

  return true;
}
