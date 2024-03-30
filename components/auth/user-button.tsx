"use client";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {useCurrentUser} from "@/hooks/use-current-user";
import {LogoutButton} from "@/components/auth/logout-button";
import Link from "next/link";
import React from "react";
import {useCurrentRole} from "@/hooks/use-current-role";
import {UserRole} from "@prisma/client";

export const UserButton = () => {
    const user  = useCurrentUser();
    const role = useCurrentRole();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || undefined}/>
                    <AvatarFallback className={"bg-white"}>
                        <FaUser className={"text-slate-900 text-2xl"}/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"h-64 w-48 flex flex-col items-center justify-around absolute top-[6px] right-[-84px] rounded-xl "}>
                <DropdownMenuItem className={"bg-slate-900 text-white w-[90%] flex items-center justify-center h-9 rounded-md cursor-pointer hover:!bg-slate-900/85 hover:!text-white"}>
                    <Link href={role === UserRole.CUSTOMER ? "/customer/settings" : role === UserRole.SELLER ? "/seller/settings" : "/admin/settings"}> Settings </Link>
                </DropdownMenuItem>
                <LogoutButton>
                    <DropdownMenuItem
                        className={"bg-slate-900 text-white w-[90%] flex items-center justify-center h-9 rounded-md cursor-pointer hover:!bg-slate-900/85 hover:!text-white"}>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}