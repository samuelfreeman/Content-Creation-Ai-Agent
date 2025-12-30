import { chatModel } from "../llm/ollama-client.js";
export const generateTitle = async (topic, value) => {
    const prompt = `Generate a catchy and concise title for a blog post about : ${topic}`;
    if (value) {
        const prompt = `Generate ${value} catchy and concise titles for a blog post about : ${topic}`;
        return await chatModel(prompt);
    }
    return await chatModel(prompt);
};
//# sourceMappingURL=generate-title.js.map