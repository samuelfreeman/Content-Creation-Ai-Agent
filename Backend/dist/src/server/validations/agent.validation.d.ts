import z from "zod";
export declare const agentSchema: z.ZodObject<{
    body: z.ZodObject<{
        task: z.ZodString;
        content: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value?: string;
        content?: string;
        task?: string;
    }, {
        value?: string;
        content?: string;
        task?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        value?: string;
        content?: string;
        task?: string;
    };
}, {
    body?: {
        value?: string;
        content?: string;
        task?: string;
    };
}>;
export type CreateAgentInput = z.infer<typeof agentSchema>;
