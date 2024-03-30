"use server";
// equivalent to api route...
import * as z from "zod";
import { RegisterSchema} from "@/schemas";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

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
    // if email does not exist the add user to db
    await  db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    });
    const verificationToken = await generateVerificationToken(email);
    // Send verification token email...
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return {success : "Confirmation email sent!" };
};