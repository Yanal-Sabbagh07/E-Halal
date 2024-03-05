import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message:"Password is required"})
});

export const RegisterSchema = z.object({
    name: z.string().min(1, "Full name"),
    email: z.string().email(),
    password: z.string().min(8,{message:"Minimum 8 characters required"}),
});