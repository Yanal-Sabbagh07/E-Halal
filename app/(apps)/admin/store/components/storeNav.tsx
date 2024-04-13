"use client";
import React from 'react';
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

const StoreNavBar = ({className,...props}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();
    const routes = [
        {
            href: `/admin/store/${params.storeId}/dashboard`,
            label: 'Dashboard',
            active: pathname === `/admin/store/${params.storeId}/dashboard`
        },
        {
            href: `/admin/store/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/admin/store/${params.storeId}/billboards`
        },
        {
            href: `/admin/store/${params.storeId}/categories`,
            label: 'Categories',
            active: pathname === `/admin/store/${params.storeId}/categories`
        }
    ]
    return (
        <nav className={cn("ml-4 flex items-center space-x-4 ", className)}>
            {routes.map((route) => (
                <Link
                    href={route.href}
                    key={route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

export default StoreNavBar;
