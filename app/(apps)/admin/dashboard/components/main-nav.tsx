"use client";
import Link from "next/link"
import {cn} from "@/lib/utils"
import React from "react";
import {usePathname} from "next/navigation";


export function MainNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();
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
                href="/admin/sellers"
                className={`${pathname === "/admin/sellers" ? "" :"text-muted-foreground"} text-sm font-medium   transition-colors hover:text-primary`}
            >
                Sellers
            </Link>
            <Link
                href="/admin/customers"
                className={`${pathname === "/admin/customers" ? "" :"text-muted-foreground"} text-sm font-medium   transition-colors hover:text-primary`}
            >
                Customers
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