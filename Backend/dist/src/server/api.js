import express from "express";
import cors from "cors";
import { handleUserTask } from "../agent/taskAgent.js";
import bycrpt from "bcrypt";
import { PrismaClient } from "../generated/prisma/client.js";
const app = express();
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import jwt from "jsonwebtoken";
import userRouter from "./routes/User.routes.js";
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
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userAlreadyExist = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!userAlreadyExist)
            throw new Error("Email does not exist.Please signup");
        const isPassword = await bycrpt.compare(password, userAlreadyExist.password);
        if (!isPassword)
            throw new Error("Invalid Credentials");
        const token = jwt.sign(userAlreadyExist.id, process.env.JWT_SECRET);
        delete userAlreadyExist.password;
        res.status(200).json({
            message: "User login successful",
            result: userAlreadyExist,
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
export function startServer(port = 5000) {
    app.listen(port, () => {
        console.log(`Agent running on http://localhost:${port}`);
    });
}
//# sourceMappingURL=api.js.map