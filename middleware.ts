import NextAuth from "next-auth";
import  authConfig  from "@/auth.config"
import {
    DEFAULT_ADMIN_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes, DEFAULT_SELLER_LOGIN_REDIRECT, DEFAULT_CUSTOMER_LOGIN_REDIRECT
} from "@/routes"
import {UserRole} from "@prisma/client";
import {currentRole} from "@/lib/auth";

const {auth} = NextAuth(authConfig);
export default  auth(async (req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isLinkedWithOtherProvider = nextUrl.search.endsWith("OAuthAccountNotLinked");
    const role = await currentRole();
    if (isApiAuthRoute) {
        if (nextUrl.search && isLinkedWithOtherProvider) {
            return Response.redirect(new URL(`/auth/login${nextUrl.search} `, nextUrl));
        }
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            if (role === UserRole.ADMIN) {
                return Response.redirect(new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl));
            }
            if (role === UserRole.SELLER) {
                return Response.redirect(new URL(DEFAULT_SELLER_LOGIN_REDIRECT, nextUrl));
            }
            if(role === UserRole.CUSTOMER){
                return Response.redirect(new URL(DEFAULT_CUSTOMER_LOGIN_REDIRECT, nextUrl));
            }

        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    return;
});
export const config= {
    // matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
