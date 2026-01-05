import express from "express";
import cors from "cors";
const app = express();
import userRouter from "./routes/User.routes.js";
import agentRouter from "./routes/Agent.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(agentRouter);
export function startServer(port = 5000) {
    app.listen(port, () => {
        console.log(`Agent running on http://localhost:${port}`);
    });
}
//# sourceMappingURL=api.js.map