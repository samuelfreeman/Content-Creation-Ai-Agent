import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
export declare const validationError: (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
