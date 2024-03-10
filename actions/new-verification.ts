"use server";

import {db} from "@/lib/db";
import {getVerificationTokenByToken} from "@/data/verification-token";
import {getUserByEmail} from "@/data/user";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    if(!existingToken){
        return {error: "Token dose not exist!"}
    }
    const tokenHasExpired = new Date(existingToken.expires) < new Date();
    if (tokenHasExpired) {
        return { error : "tocken has expired!" };
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser){
        return {error : "Email does not exist! "};
    }

    await db.user.update({
        where : {id:existingUser.id},
        data : {
            emailVerified: new Date(),
            email : existingToken.email  //when users wants to change their emails
        }
    });

    await db.verificationToken.delete({
        where : {id : existingToken.id}
    });

    return { success : "Email verified!"};
}