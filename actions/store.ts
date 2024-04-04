"use server";
import {z} from "zod";
import {addStoreSchema} from "@/schemas";
import {db} from "@/lib/db";

export const addStore = async (values: z.infer<typeof addStoreSchema>) => {
    const validatedFields = addStoreSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {name} = validatedFields.data;
    const storeId = Date.now().toString();
    try {
        await db.store.create({
            data: {
                id:storeId,
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
                storeId,
            }
        })
    } catch {
        return {error: "Could not create usersStores"}
    }
    return {success: "Store Created!"}
}