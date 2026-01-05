import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import dotenv from "dotenv";
dotenv.config();
const dbValues = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
console.table(dbValues);
const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true
});
export const prisma = new PrismaClient({ adapter });
//# sourceMappingURL=prismaUtil.js.map