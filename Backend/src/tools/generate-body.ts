import { chatModel } from "../llm/ollama-client.js";

export const generateBody = async (topic: string, sectionCount?: number) => {
  // base prompt when no section count is specified
  const prompt = `
Write the main body of a blog post about: ${topic}.
Split the content into clear sections with H2 and H3 subheadings.
Each section should:
- Introduce one main idea
- Use examples, statistics, or visuals (describe them briefly)
- End with a short takeaway or summary line

Write in a conversational and engaging tone.
Use short paragraphs and bullet points where appropriate.
Do not include any formatting symbols (like ** or ##).
Keep the total length between 400–600 words.
  `;

  // when section count is explicitly specified
  if (sectionCount && sectionCount !== 0) {
    const prompt = `
Write the main body of a blog post about: ${topic}.
Generate ${sectionCount} sections with clear H2 and H3 subheadings.
Each section should:
- Introduce one main idea
- Use examples, statistics, or visuals (describe them briefly)
- End with a short takeaway or summary line

Write in a conversational and engaging tone.
Use short paragraphs and bullet points where appropriate.
Do not include any formatting symbols (like ** or ##).
Keep the total length between 400–600 words.
    `;
    return await chatModel(prompt);
  }

  return await chatModel(prompt);
};
