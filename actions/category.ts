"use server";
import {z} from "zod";
import {
    createCategorySchema,
    deleteCategorySchema,
    updateCategorySchema
} from "@/schemas";
import {db} from "@/lib/db";

export const CreateCategory = async (values: z.infer<typeof createCategorySchema>) => {
    const validatedFields = createCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id, name, billboardId, storeId} = validatedFields.data;
    try {
        await db.category.create({
            data: {
                id,
                name,
                billboardId,
                storeId,
            }
        });
    } catch (error) {
        return {
            error: "Could not create the Category!"
        }
    }
    return {success: "Category Created Successfully!"}
}

export const EditCategory = async (values: z.infer<typeof updateCategorySchema>) => {
    const validatedFields = updateCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id, name, billboardId} = validatedFields.data;
    try {
        await db.category.update({
            where: {
                id,
            },
            data: {
                id,
                name,
                billboardId,
            }
        });
    } catch (error) {
        return {
            error: "Could not Update the Category!"
        }
    }
    return {success: "Category Updated Successfully!"}
}

export const DeleteCategory = async (values: z.infer<typeof deleteCategorySchema>) => {
    const validatedFields = deleteCategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {id} = validatedFields.data;
    try {
        await db.category.delete({
            where: {
                id,
            }
        });
    } catch (error) {
        return {
            error: "Could not Delete the Category!"
        }
    }
    return {success: "Category Updated Successfully!"}
}