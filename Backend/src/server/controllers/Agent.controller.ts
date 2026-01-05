import { handleUserTask } from "../../agent/taskAgent.js";
import { Request, Response } from "express";


export const agent = async (req: Request, res: Response,) => {
    const { task, content, value } = req.body;
    try {
        const result = await handleUserTask(task, content, value);
        console.log(result)
        res.send(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}