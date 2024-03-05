"use server";
// equivalent to api route...
import * as z from "zod";
import { RegisterSchema} from "@/schemas";

export const register = async (values : z.infer<typeof RegisterSchema> ) => {
    // validate the fields
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid fields!"};
    }
    return { success: "Valid fields!"};
};