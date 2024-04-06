"use server";
import {z} from "zod";
import {addStoreSchema, deleteStoreSchema} from "@/schemas";
import {db} from "@/lib/db";

export const addStore = async (values: z.infer<typeof addStoreSchema>) => {
    const validatedFields = addStoreSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id,name} = validatedFields.data;
    // const storeId = Date.now().toString();
    try {
        await db.store.create({
            data: {
                id:id,
                name,
            }
        });
    } catch {
        return {
            error: "name is already taken please use a different one!"
        }
    }
    try {
        await db.usersStores.create({
            data: {
                storeId:id,
            }
        })
    } catch {
        return {error: "Could not create usersStores"}
    }
    return {success: "Store Created!"}
}

export const deleteStore = async (values: z.infer<typeof deleteStoreSchema>) =>{
    const validatedFields = deleteStoreSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id} = validatedFields.data;
    try {
        await db.store.delete({
            where: {
                id,
            }
        });
    } catch {
        return {
            error: "Couldn't delete the store"
        }
    }
    return {success: "Store Deleted!"}
};