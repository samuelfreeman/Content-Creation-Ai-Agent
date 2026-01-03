import { Router } from "express";
import { validationError } from "../middleware/validationError.js";
import { createUserSchema } from "../validations/user.validation.js";
import { signup } from "../controllers/User.controller.js";


const userRouter = Router();

userRouter.post("/signup", validationError(createUserSchema), signup)

export default userRouter;