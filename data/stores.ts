import {db} from "@/lib/db";
import {getUserById} from "@/data/user";


export const getAllStores = async () => {
    try {
        return await db.store.findMany();
    } catch {
        return null;
    }
};
export const getStoreById = async (id: string) => {
    try {
        return await db.store.findUnique({
            where: {id}
        })
    } catch {
        return null;
    }
}
export const getStoreByName = async (name: string) => {
    try {
        return await db.store.findUnique({
            where: {name,}
        })
    } catch {
        return null;
    }
}

export const getStoreUsersByStorId = async (id: string) => {
    try {
        const storesOwners = await db.usersStores.findMany({
            where: {storeId: id}
        });
        const usersIds =storesOwners.map(storeOwnerId => storeOwnerId.userId);
        const users = await Promise.all( usersIds.map(async (id) => { // Promise.all solves the problem of trying to await an array of promises rather than a Promise. This doesn't do what you expect.
            return  await getUserById(id);
        }));
        return users
    } catch {
        return null;
    }
}

export const getAllCountries = async () => {
    try {
        return await db.country.findMany();
    }
    catch {
        return null;
    }
}
export const getCountryByName = async (name: string) => {
    try {
        return await db.country.findUnique({
            where: {
                name,
            }
        });
    }
    catch {
        return null;
    }
}
