"use server";
// equivalent to api route...
import * as z from "zod";
import { RegisterSchema} from "@/schemas";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";

export const register = async (values : z.infer<typeof RegisterSchema> ) => {
    // validate the fields
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid fields!"};
    }
    const {name, email , password} = validatedFields.data;
    // hashing the password
    const hashedPassword = await  bcrypt.hash(password, 10);
    // check if the email is taken
    const existingUser = await  getUserByEmail(email);
    if(existingUser){
        return ({error: "Email is already in use"});
    }
    // if email dosent exist the add user to db
    await  db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    });

    // TODO: Send verification token email...

    return { success: "User Created successfully!"};
};