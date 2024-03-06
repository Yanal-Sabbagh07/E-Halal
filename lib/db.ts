import {PrismaClient} from "@prisma/client";

declare  global {
    var prisma: PrismaClient | undefined;
}
export const db = globalThis.prisma || new PrismaClient();

// if we're not in production we store the db inside globalThis.prisma (reason: nexdt.js hot reload create db instance everytime we change and save);
if(process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}