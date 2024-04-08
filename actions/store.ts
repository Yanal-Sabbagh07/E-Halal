"use server";
import {z} from "zod";
import {addStoreSchema, deleteStoreSchema} from "@/schemas";
import {db} from "@/lib/db";

export const addStore = async (values: z.infer<typeof addStoreSchema>) => {
    const validatedFields = addStoreSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id,name, department} = validatedFields.data;
    try {
        await db.store.create({
            data: {
                id:id,
                name,
                department
            }
        });
    } catch (error) {
        return {
            error: "Could not create a store! "
        }
    }
    try {
        await db.usersStores.create({
            data: {
                storeId:id,
            }
        })
    } catch {
        return {error: "Could not assign owner to the store!"}
    }
    return {success: "Store Created, and admin assigned as an owner!"}
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