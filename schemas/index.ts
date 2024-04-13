import * as z from "zod";
import {UserRole} from "@prisma/client";
import {Department} from "@prisma/client";

export const LoginSchema = z.object({
    email: z.string().email({message: "Email is required"}),
    password: z.string().min(1, {message: "Password is required"}),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, "Full name"),
    email: z.string().email({message: "Email is required"}),
    password: z.string().min(8, {message: "Minimum 8 characters required"}),
});

export const ResetSchema = z.object({
    email: z.string().email({message: "Email is required"}),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {message: "Minimum of 8 characters required!"}),
});

export const SettingSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER])),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8))
}).refine((data) => {
    if (data.password && !data.newPassword) {
        return false;
    }
    return true;
}, {
    message: "new password si required!",
    path: ["newPassword"]
})
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }
        return true;
    }, {message: "password is required!", path: ["password"]});

export const createStoreSchema = z.object( {
    id: z.string().min(1),
    name: z.string().min(1,"Store Name"),
    department: z.enum([Department.Supermarket, Department.Meat, Department.Perfume]),
    addressId: z.optional(z.string().min(1)),
    city: z.string().min(1),
    street_name: z.string().min(1),
    house_number: z.string().min(1),
    postal_code : z.string().min(1),
    countryId: z.string().min(1),
});

export const deleteStoreSchema = z.object({
    id: z.string().min(1),
    addressId: z.string().min(1)
});

export const assignSellerSchema = z.object({
    userId: z.string().min(1),
    storeId: z.string().min(1)
});

export const createBillboardSchema = z.object({
    id: z.optional(z.string().min(1)),
    label: z.string().min(1),
    imageUrl: z.string().min(1),
    storeId: z.string().min(1),
});
export const deleteBillboardSchema = z.object({
    id: z.string().min(1),
});

export const createCategorySchema = z.object({
    id: z.optional(z.string().min(1)),
    name: z.string().min(1),
    storeId: z.string().min(1),
    billboardId: z.string().min(1),
});

export const updateCategorySchema = z.object({
    id: z.optional(z.string().min(1)),
    name: z.string().min(1),
    storeId: z.string().min(1),
    billboardId: z.string().min(1),
});

export const deleteCategorySchema = z.object({
    id: z.string().min(1),
});