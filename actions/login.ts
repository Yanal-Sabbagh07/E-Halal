"use server";
// equivalent to api route...
import * as z from "zod";
import { LoginSchema} from "@/schemas";

export const login = async (values : z.infer<typeof LoginSchema> ) => {
    // validate the fields
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid fields!"};
    }
    return { success: "Valid fields!"};
};