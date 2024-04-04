import {db} from "@/lib/db";
import {UserRole} from "@prisma/client";
import {getStoreById} from "@/data/stores";

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

export const getUsersByRole = async (role: UserRole) => {
    try {
        return await db.user.findMany({
            where: {
                role,
            }
        });
    } catch {
        return null;
    }
};

export const getAllUsers = async () => {
    try {
        return await db.user.findMany();
    } catch {
        return null;
    }
};
interface IStores {
    id:string
    name:string
}
export const getUserStoresByUserId = async (id: string) => {
    try {
        const userStores = await db.usersStores.findMany({
            where: {userId: id}
        });
        if(userStores.length === 0 ){
            return null;
        }
        console.log("userstores",userStores)
        const storesIds = userStores.map(userStoreId => userStoreId.storeId);
        const stores : IStores[]  = await Promise.all( storesIds.map(async (id) => {
            if(!id){
                throw new Error("Something went wrong")
            }
            const store = await getStoreById(id);
            if(!store ){
                return {id: "" , name: "" };
            }
            return store;
        }));
        return stores
    } catch {
        return ;
    }
}
