import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';


export const validationError = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: error.errors.map((err: any) => ({ path: err.path.join('.'), message: err.message })),
            });
        }
    };
};