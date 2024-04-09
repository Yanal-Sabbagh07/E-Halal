"use server";
import {z} from "zod";
import {createStoreSchema, deleteStoreSchema} from "@/schemas";
import {db} from "@/lib/db";

export const addStore = async (values: z.infer<typeof createStoreSchema>) => {
    const validatedFields = createStoreSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id,name, department,street_name,house_number,postal_code,countryId,city} = validatedFields.data;
    const addressId = Date.now().toString();
    try {
        await db.address.create({
            data: {
                id:addressId,
                city,
                street_name,
                house_number,
                postal_code,
                countryId,
            }
        });
    } catch (error) {
        return {
            error: "Could not create an address!"
        }
    }
    try {
        await db.store.create({
            data: {
                id,
                name,
                department,
                addressId,
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
    const {id, addressId} = validatedFields.data;
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
    try {
        await db.address.delete({
            where: {
                id: addressId,
            }
        });
    } catch {
        return {
            error: "Couldn't delete the related address"
        }
    }
    return {success: "Store Deleted!"}
};
