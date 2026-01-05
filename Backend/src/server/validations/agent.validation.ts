import z from "zod";


export const agentSchema = z.object({
    body: z.object({
        task: z.string({
            required_error: "Task is required",
        }).min(3, "Task must be at least 3 characters long"),
        content: z.string({
            required_error: "Content is required",
        }).min(3, "Content must be at least 3 characters long"),
        value: z.string().optional(),
    }),
})



export type CreateAgentInput = z.infer<typeof agentSchema>;