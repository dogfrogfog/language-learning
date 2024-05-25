"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { WordData } from "@/app/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MultiStepForm = ({
  wordsData,
  setFormWordsData,
}: {
  wordsData: (WordData & { value: string })[];
  setFormWordsData: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  if (!wordsData) return null;

  const handleOptionSelect = (selectedOption: string, isTrue: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = selectedOption;
    setAnswers(updatedAnswers);

    if (isTrue) toast("Correct answer ✅");
    if (!isTrue) toast("Answer is not correct 🚫");

    setStep(step + 1);
  };

  return (
    <div className="px-10 min-h-screen">
      {step < wordsData.length && (
        <div className="flex flex-col items-center justify-between">
          <div className="space-y-4">
            <h2 className="text-center">Task {step + 1}</h2>
            <p className="font-bold text-center">Choose correct option</p>
            <p>
              Description: <i>{wordsData[step].description}</i>
            </p>
          </div>
          <div className="mt-20 space-y-6">
            <button
              className="block w-40 p-3 text-center bg-yellow-200 rounded"
              onClick={() => handleOptionSelect(wordsData[step].value, true)}
            >
              {wordsData[step].value}
            </button>
            {wordsData[step].alternativeOptions.map((v) => (
              <button
                key={v}
                className="block w-40 p-3 text-center bg-yellow-200 rounded"
                onClick={() => handleOptionSelect(v, false)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
      {wordsData.length > 0 && wordsData.length === step && (
        <div className="flex flex-col gap-10 items-center mt-10">
          <h2 className="text-xl">Results</h2>

          <div className="my-10">
            {answers.map((v, i) => (
              <div
                key={v}
                className={cn({
                  "bg-green-200": v === wordsData[i].value,
                  "bg-red-200": v !== wordsData[i].value,
                })}
              >
                {v}
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setFormWordsData("[]");
              setStep(0);
              setAnswers([]);

              router.push("list");
            }}
            className="p-3 rounded bg-orange-200"
          >
            Back to list of words
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
