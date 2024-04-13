import {db} from "@/lib/db";

export const getAllCategories = async () => {
    try {
        return await db.category.findMany();
    } catch {
        return null;
    }
};

export const getCategoryById = async (id: string) => {
    try {
        return await db.category.findUnique({
            where: {id}
        })
    } catch {
        return null;
    }
}

export const getCategoriesByStoreId = async (storeId: string) => {
    try {
        return await db.category.findMany({
            where: {storeId},
            orderBy:{createdAt:'desc'}
        })
    } catch {
        return null;
    }
}
