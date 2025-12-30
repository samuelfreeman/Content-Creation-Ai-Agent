import { chatModel } from "../llm/ollama-client.js";
export const generateConclusion = async (topic, value) => {
    const prompt = `Generate a catchy and concise conclusion for a blog post about : ${topic}. Keep it between 50–80 words.`;
    if (value !== 0) {
        const prompt = `Generate ${value} catchy  conclusion for a blog post about : ${topic}. Keep each intro between 50–80 words.`;
        return await chatModel(prompt);
    }
    return await chatModel(prompt);
};
//# sourceMappingURL=generate-conclusion.js.map