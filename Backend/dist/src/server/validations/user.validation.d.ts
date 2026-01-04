import z from 'zod';
export declare const createUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        fullname: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        fullname?: string;
        email?: string;
        password?: string;
    }, {
        fullname?: string;
        email?: string;
        password?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        fullname?: string;
        email?: string;
        password?: string;
    };
}, {
    body?: {
        fullname?: string;
        email?: string;
        password?: string;
    };
}>;
export declare const loginUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email?: string;
        password?: string;
    }, {
        email?: string;
        password?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        email?: string;
        password?: string;
    };
}, {
    body?: {
        email?: string;
        password?: string;
    };
}>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
