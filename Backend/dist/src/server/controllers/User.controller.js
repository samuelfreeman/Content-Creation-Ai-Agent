import bycrpt from "bcrypt";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import jwt from "jsonwebtoken";
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });
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
//# sourceMappingURL=User.controller.js.map