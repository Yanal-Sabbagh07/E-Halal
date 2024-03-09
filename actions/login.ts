"use server";
// equivalent to api route...
import * as z from "zod";
import { LoginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";

export const login = async (values : z.infer<typeof LoginSchema> ) => {
    // validate the fields
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid fields!"};
    }
    // return { success: "Valid fields!"};
    const {email, password} = validatedFields.data;
    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid Email or Password!"}
                default:
                    return {error: "Something went wrong!"}
            }
        }
        throw error;
    }
};