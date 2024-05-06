"use server";

import { generateObject } from "ai";
import { createMistral } from "@ai-sdk/mistral";
import { z } from "zod";

const mistral = createMistral();

const wordDataSchema = z.object({
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
export type WordData = z.infer<typeof wordDataSchema>;

// inout ic comma separated words eg: ephimeral,scocer,house
export async function getWordsOptions(input: string) {
  "use server";

  const { object: JSONdata } = await generateObject({
    model: mistral("open-mixtral-8x7b"),
    system: `You generate variants of the answers for the "learning words" app. User is required to pick correct option from the list of three.`,
    prompt: `Generate two alternative words with the similar meaning and the description for each of the comma separated words. Words: ${input}.`,
    schema: z.object({
      wordsData: z.array(wordDataSchema),
    }),
  });

  return JSONdata;
}
