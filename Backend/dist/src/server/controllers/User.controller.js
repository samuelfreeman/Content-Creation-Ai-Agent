import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prismaUtil.js";
export const signup = async (req, res, next) => {
    const data = req.body;
    const hashedPassword = await bycrpt.hash(data.password, 15);
    data.password = hashedPassword;
    try {
        const userAlreadyExist = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (userAlreadyExist)
            throw new Error("Email already exist! Please login");
        const result = await prisma.user.create({ data });
        const token = jwt.sign(result.id, process.env.JWT_SECRET);
        delete result.password;
        res.status(201).json({
            message: "User created successfully",
            result,
            token
        });
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
export const login = async (req, res, next) => {
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
};
//# sourceMappingURL=User.controller.js.map