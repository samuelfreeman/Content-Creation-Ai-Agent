import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { prisma } from "../../utils/prismaUtil.js"

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body

        const userAlreadyExist = await prisma.user.findUnique({
            where: { email: data.email }
        })
        if (userAlreadyExist) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const hashedPassword = await bcrypt.hash(data.password, 15)
        data.password = hashedPassword

        const result = await prisma.user.create({ data })

        const token = jwt.sign(
            { userId: result.id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        delete result.password

        res.status(201).json({
            message: "User created successfully",
            result
        })
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const userAlreadyExist = await prisma.user.findUnique({
            where: { email }
        })
        if (!userAlreadyExist) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPassword = await bcrypt.compare(password, userAlreadyExist.password)
        if (!isPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { userId: userAlreadyExist.id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        delete userAlreadyExist.password

        res.status(200).json({
            message: "User login successful",
            result: userAlreadyExist
        })
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}
