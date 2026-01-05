import { Router } from "express";

const agentRouter = Router();
import { agent } from "../controllers/Agent.controller.js";
import { validationError } from "../middleware/validationError.js";
import { agentSchema } from "../validations/agent.validation.js";

agentRouter.post("/agent", validationError(agentSchema), agent);

export default agentRouter;