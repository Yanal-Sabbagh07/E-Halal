import {db} from "@/lib/db";

export const getAllBillboards = async () => {
    try {
        return await db.billBoard.findMany();
    } catch {
        return null;
    }
};

export const getBillboardById = async (id: string) => {
    try {
        return await db.billBoard.findUnique({
            where: {id}
        })
    } catch {
        return null;
    }
}

export const getBillboardsByStoreId = async (storeId: string) => {
    try {
        return await db.billBoard.findMany({
            where: {storeId},
            orderBy:{createdAt:'desc'}
        })
    } catch {
        return null;
    }
}
