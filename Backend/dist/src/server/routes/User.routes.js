import { Router } from "express";
import { validationError } from "../middleware/validationError.js";
import { createUserSchema, loginUserSchema } from "../validations/user.validation.js";
import { login, signup } from "../controllers/User.controller.js";
const userRouter = Router();
userRouter.post("/signup", validationError(createUserSchema), signup);
userRouter.post("/login", validationError(loginUserSchema), login);
export default userRouter;
//# sourceMappingURL=User.routes.js.map