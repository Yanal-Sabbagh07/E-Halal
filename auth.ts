import NextAuth from "next-auth"

import authConfig from "@/auth.config";
import {db} from "@/lib/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {getUserById} from "@/data/user";
import {UserRole} from "@prisma/client";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    events: {
        async linkAccount({user}) {
            await db.user.update ({
                where: {id : user.id},
                data:{emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({user, account}) {
            // allow OAuth without email verification
            if (account?.provider !== "credentials") return true;
            if (!user.id) return false;
            const existingUser = await getUserById(user.id);
            // prevent signin without email verification
            if (!existingUser?.emailVerified) return false;
            //TODO: Add 2FA check
            return true;
        },
        async session ({token, session}) {
            console.log({sessionToken: token});
            if(token.sub && session.user) {
                session.user.id = token.sub;
            }
            if(token.role && session.user) {
                session.user.role = token.role as  UserRole;
            }
            return session;
        },
        async jwt({token}) {
            if(!token.sub) {
                return token;
            }
            const existingUser = await getUserById(token.sub) ;
            if(!existingUser) {
                return token;
            }
            token.role = existingUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})
