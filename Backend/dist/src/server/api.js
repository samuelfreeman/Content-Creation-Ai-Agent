import express from "express";
import cors from "cors";
import { handleUserTask } from "../agent/taskAgent.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import userRouter from "./routes/User.routes.js";

const app = express();
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });
app.use(cors());
app.use(express.json());
app.post("/agent", async (req, res, next) => {
    const { task, content, value } = req.body;
    try {
        const result = await handleUserTask(task, content, value);
        console.log(result);
        res.send(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.use(userRouter);
export function startServer(port = 5000) {
    app.listen(port, () => {
        console.log(`Agent running on http://localhost:${port}`);
    });
}
//# sourceMappingURL=api.js.map