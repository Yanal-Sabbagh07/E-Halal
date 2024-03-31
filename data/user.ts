import {db} from "@/lib/db";
import {UserRole} from "@prisma/client";

export const getUserByEmail = async  (email: string) => {
    try {
        return await db.user.findUnique({where: {email}}) ;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        return await db.user.findUnique({where: {id}});
    }catch {
        return null;
    }
};

export const fetchUsers = async (role: UserRole) => {
    try {
        return await db.user.findMany({
            where: {
                role,
            }
        });
    } catch {
        throw new Error("Failed to fetch the users!")
    }
};
