"use server";


import {ResetSchema} from "@/schemas";
import {z} from "zod";
import {getUserByEmail} from "@/data/user";
import {generatePasswordResetToken} from "@/lib/tokens";
import {sendPasswordResetEmail} from "@/lib/mail";

export const  reset = async (values : z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values); // server side validation
    if(!validateFields.success) {
        return { error : "Invalid email!"}
    }
    const {email} = validateFields.data ;

    const existingUser = await getUserByEmail(email);

    if( !existingUser ) {
        return (
            {error: "Email not found!"}
        );
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return {success : "Reset email has been sent!"};
}