"use client";
import Link from "next/link";
import React, { useState } from "react";

const MultiStepForm = ({
  wordsOptions,
}: {
  wordsOptions: { option1: string; option2: string; option3: string }[];
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleOptionSelect = (selectedOption: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = selectedOption;
    setAnswers(updatedAnswers);

    setStep(step + 1);
  };

  const handleSubmit = () => {
    // Здесь можно добавить логику для обработки отправки формы, например, проверку правильности ответов
    console.log("Отправка ответов:", answers);
  };

  return (
    <div className="px-10 min-h-screen">
      {step < wordsOptions.length ? (
        <div className="flex flex-col items-center justify-between">
          <div>
            <h2>Задание {step + 1}</h2>
            <p>Выберите правильный вариант ответа:</p>
          </div>
          <div className="mt-20 space-y-6">
            <button
              className="block w-40 p-3 text-center bg-yellow-200 rounded"
              onClick={() => handleOptionSelect(wordsOptions[step].option1)}
            >
              {wordsOptions[step].option1}
            </button>
            <button
              className="block w-40 p-3 text-center bg-yellow-200 rounded"
              onClick={() => handleOptionSelect(wordsOptions[step].option2)}
            >
              {wordsOptions[step].option2}
            </button>
            <button
              className="block w-40 p-3 text-center bg-yellow-200 rounded"
              onClick={() => handleOptionSelect(wordsOptions[step].option3)}
            >
              {wordsOptions[step].option3}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 items-center p-10 border-2 rounded border-black mt-10">
          <h2>Форма завершена</h2>
          <Link className="p-3 rounded bg-orange-200" href="/list">
            К списку слов
          </Link>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
