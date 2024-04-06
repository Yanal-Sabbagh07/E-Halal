"use client";
import Link from "next/link"
import {cn} from "@/lib/utils"
import React from "react";
import {usePathname} from "next/navigation";


export function MainNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {


    const pathname = usePathname();
    const singleStorePath = pathname.match(/^\/admin\/stores\/(\d+)/);
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Link
                href="/admin/dashboard"
                className={`${pathname === "/admin/dashboard" ? "" :"text-muted-foreground"} text-sm font-medium   transition-colors hover:text-primary`}
            >
                Overview
            </Link>
            <Link
                href={`${pathname === singleStorePath?.input ? "" : "/admin/stores"}`}
                className={`${pathname === "/admin/stores" || pathname === singleStorePath?.input ? "" :"text-muted-foreground"} text-sm font-medium   transition-colors hover:text-primary`}
            >
                Stores
            </Link>
            <Link
                href="/admin/users"
                className={`${pathname === "/admin/users" ? "" :"text-muted-foreground"} text-sm font-medium   transition-colors hover:text-primary`}
            >
                Users
            </Link>
            <Link
                href="/admin/products"
                className={`${pathname === "/admin/products" ? "" :"text-muted-foreground"} text-sm font-medium   transition-colors hover:text-primary`}
            >
                Products
            </Link>
            <Link
                href="/admin/settings"
                className={`${pathname === "/admin/settings" ? "" :"text-muted-foreground"} text-sm font-medium   transition-colors hover:text-primary`}
            >
                Settings
            </Link>
        </nav>
    )
}