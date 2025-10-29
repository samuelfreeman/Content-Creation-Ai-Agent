import { generateTitle } from "../tools/generate-title.js";
import { chatModel } from "../llm/ollama-client.js";
import { generateIntro } from "../tools/generate-intro.js";


export const handleUserTask = async (task: string, content: string, value?: number,sectionCount?:string) => {
    console.log(`Handling task: ${task} with content: ${content} and value: ${value}`);
    // title regex to check if task contains the word title (case insensitive)
    if (/title/i.test(task) && !value) {
        const title = await generateTitle(content);
        console.log(title)
        return { type: task, result: title }
    }
    if (/title/i.test(task) && value) {
        const result = await generateTitle(content, value);
        // removes empty titles and trim whitespace
        const titles = result.split('\n').map((title) => title.trim()).filter((title: string) => title.trim() !== '');

        return { type: task, result: titles }
    }

    // intro regex to check if task contains the word intro or introduction (case insensitive)
    if (/introduction/i.test(task) || /intro/i.test(task)  && !value) {
        const result = await generateIntro(content, value);
        console.log(result)
        return { type: task, result: result }
    }
    if (/(introduction|intro)/i.test(task) && value) {
        const result = await generateIntro(content, value);
        // removes empty intros and trim whitespace
        const intros = result.split('\n').map((intro) => intro.trim()).filter((intro: string) => intro.trim() !== '');

        return { type: task, result: intros }
    }

    if (/generate body/i.test(task) || /body/i.test(task)) {
        const body = await chatModel(content);
        return { type: "body", result: body };
    }

    if (/rewrite/i.test(task)) {
        const prompt = `Rewrite the following content in a more engaging tone:\n\n${content}`;
        const rewritten = await chatModel(prompt);
        return { type: "rewrite", result: rewritten };
    }

    const generic = await chatModel(content);
    return { type: "generic", result: generic };
}