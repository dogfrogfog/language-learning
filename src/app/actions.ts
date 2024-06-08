"use server";

import { generateObject } from "ai";
import { createMistral } from "@ai-sdk/mistral";
import { z } from "zod";

const mistral = createMistral();

const guessTheWordDataSchema = z.object({
  description: z.string().describe("Description of the given word."),
  alternativeOptions: z
    .array(
      z
        .string()
        .describe(
          "Word with a similar meaning to a given word from Cambridge Dictionary."
        )
    )
    .length(2),
});
export type GuessTheWordData = z.infer<typeof guessTheWordDataSchema>;

export async function getGuessTheWordData(input: string) {
  "use server";

  const { object: JSONdata } = await generateObject({
    model: mistral("open-mixtral-8x7b"),
    system: `You generate variants of the answers for the "learning words" app. User is required to pick correct option from the list of three.`,
    prompt: `Generate two alternative words with the similar meaning and the description for each of the comma separated words. Words: ${input}.`,
    schema: z.object({
      data: z.array(guessTheWordDataSchema),
    }),
  });

  return JSONdata;
}

const findTheMistakeDataSchema = z.object({
  sentanse: z.string().describe("The original sentence with a mistake."),
  mistake: z.string().describe("The incorrect part of the sentence."),
  correction: z.string().describe("The correct version of the mistake."),
  explanation: z
    .string()
    .describe("A brief explanation of the mistake and its correction."),
});
export type FindTheMistakeData = z.infer<typeof findTheMistakeDataSchema>;

export async function getFindTheMistakeData(input: string) {
  "use server";

  const { object: JSONdata } = await generateObject({
    model: mistral("open-mixtral-8x7b"),
    system: `
        You are a specialist in language learning exercises in English. Your task is to generate sentences with intentional grammatical mistakes for students to identify and correct. Follow these guidelines strictly:

      1. For each word in the provided array, generate exactly one sentence.
      2. Each sentence must include one word from the provided array.
      3. Identify the incorrect part of the sentence, provide the correct version, and explain why it is incorrect.
      4. Ensure that the mistakes cover a variety of common grammar issues, such as verb tense, subject-verb agreement, prepositions, and articles.
      5. Ensure the sentences are on random, child-friendly topics and exclude any inappropriate content such as conflicts, war, violence, or gender issues.

      Here are the comma separated words: ${input}

      Generate one sentence for each word, resulting in a total of ${
        input.split(",").length
      } sentences.
    `,
    prompt: `Generate sentences with grammatical mistakes using the following comma separated words: ${input}. Each sentence should include one word from the list and follow the guidelines provided. Structure the output in the specified JSON format.`,
    schema: z.object({
      data: z.array(findTheMistakeDataSchema),
    }),
  });

  return JSONdata;
}
