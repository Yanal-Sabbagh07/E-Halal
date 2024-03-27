"use client";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {useCurrentUser} from "@/hooks/use-current-user";
import {LogoutButton} from "@/components/auth/logout-button";

export const UserButton = () => {
    const user  = useCurrentUser();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || undefined}/>
                    <AvatarFallback className={"bg-gray-900 "}>
                        <FaUser className={"text-white"}/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={"h-64 w-48 flex flex-col items-center justify-around absolute top-[6px] right-[-84px] rounded-xl"}>
                <LogoutButton>
                    <DropdownMenuItem
                        className={"bg-slate-900 hover:bg-sky-500 text-white w-[90%] flex items-center justify-center h-9 rounded-md cursor-pointer"}>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
                <DropdownMenuItem
                    className={"bg-slate-900 hover:bg-sky-500 text-white w-[90%] flex items-center justify-center h-9 rounded-md cursor-pointer"}>
                    Settings
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}