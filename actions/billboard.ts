"use server";
import {z} from "zod";
import {createBillboardSchema, deleteBillboardSchema} from "@/schemas";
import {db} from "@/lib/db";

export const CreateBillBoard = async (values: z.infer<typeof createBillboardSchema>) => {
    const validatedFields = createBillboardSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id, label, imageUrl, storeId} = validatedFields.data;
    try {
        await db.billBoard.create({
            data: {
                id,
                label,
                imageUrl,
                storeId,
            }
        });
    } catch (error) {
        return {
            error: "Could not create the Billboard!"
        }
    }
    return {success: "Billboard Created Successfully!"}
}

export const EditBillBoard = async (values: z.infer<typeof createBillboardSchema>) => {
    const validatedFields = createBillboardSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id, label, imageUrl, storeId} = validatedFields.data;
    try {
        await db.billBoard.update({
            where: {
                id,
            },
            data: {
                id,
                label,
                imageUrl,
                storeId,
            }
        });
    } catch (error) {
        return {
            error: "Could not Update the Billboard!"
        }
    }
    return {success: "Billboard Updated Successfully!"}
}

export const DeleteBillBoard = async (values: z.infer<typeof deleteBillboardSchema>) => {
    const validatedFields = deleteBillboardSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id} = validatedFields.data;
    try {
        await db.billBoard.delete({
            where: {
                id,
            }
        });
    } catch (error) {
        return {
            error: "Could not Delete the Billboard!"
        }
    }
    return {success: "Billboard Updated Successfully!"}
}