"use server";
import {z} from "zod";
import {assignSellerSchema} from "@/schemas";
import {db} from "@/lib/db";

export const assignSeller = async (values: z.infer<typeof assignSellerSchema>) => {
    const validatedFields = assignSellerSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {userId,storeId} = validatedFields.data;
    try {
        await db.usersStores.create({
            data: {
                userId,
                storeId
            }
        });
    } catch {
        return {
            error: "name is already taken please use a different one!"
        }
    }
    return {success: "Owner Added"}
}