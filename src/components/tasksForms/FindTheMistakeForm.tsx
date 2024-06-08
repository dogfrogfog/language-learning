"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { FindTheMistakeData } from "@/app/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function FindAMistakeForm({
  sentencesData,
}: {
  sentencesData: FindTheMistakeData[];
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  if (!sentencesData) return null;

  const handleOptionSelect = (isTrue: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = isTrue;
    setAnswers(updatedAnswers);

    if (isTrue) toast("Correct answer ✅");
    if (!isTrue) toast("Answer is not correct 🚫");
  };

  const [beforeMistakePart, afterMistakePart] =
    sentencesData[step]?.sentanse.split(sentencesData[step].mistake) || [];

  const isAnswered = answers[step] !== undefined;

  return (
    <div className="px-10 min-h-screen">
      {beforeMistakePart && afterMistakePart && step < sentencesData.length && (
        <div className="flex flex-col items-center justify-between">
          <h2 className="text-center">Task {step + 1}</h2>
          <div className="mt-20 space-y-6">
            <div>
              <button onClick={() => handleOptionSelect(false)}>
                {beforeMistakePart}
              </button>{" "}
              <button onClick={() => handleOptionSelect(true)}>
                {sentencesData[step].mistake}
              </button>{" "}
              <button onClick={() => handleOptionSelect(false)}>
                {afterMistakePart}
              </button>
            </div>
            {isAnswered && (
              <>
                <div>
                  <p className="mb-2 font-semibold">Explanation:</p>
                  <p>
                    <i>{sentencesData[step].explanation}</i>
                  </p>
                </div>
                <button
                  className="p-4 bg-yellow-400"
                  onClick={() => setStep(step + 1)}
                >
                  Next {"->"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {sentencesData.length > 0 && sentencesData.length === step && (
        <div className="flex flex-col gap-10 items-center mt-10">
          <h2 className="text-xl">Results</h2>

          <div className="my-10">
            {answers.map((v, i) => (
              <div
                key={i}
                className={cn({
                  "bg-green-200": v,
                  "bg-red-200": !v,
                })}
              >
                {v ? `${i + 1}. Correct` : `${i + 1}. Incorrect`}
              </div>
            ))}
          </div>
          <Link href="/tasks" className="p-3 rounded bg-orange-200">
            Back to tasks
          </Link>
        </div>
      )}
    </div>
  );
}
