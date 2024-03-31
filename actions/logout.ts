"use server" ;

import {signOut} from "@/auth";

export const logout = async () => {
    // We can do something here before logging out if we need to...
    await  signOut();
}