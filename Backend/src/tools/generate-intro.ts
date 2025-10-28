import { chatModel } from "../llm/ollama-client.js";


export const generateIntro = async (topic: string, value?: number) => {
    const prompt = `Generate a catchy and concise Intro for a blog post about : ${topic}`;

    // value param to specify number of titles
    if (value !== 0) {
        const prompt = `Generate ${value} catchy and concise Intro for a blog post about : ${topic}`;
    return await chatModel(prompt);
    }

    return await chatModel(prompt);
}