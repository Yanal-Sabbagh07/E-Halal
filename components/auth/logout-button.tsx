"use client";

import {logout} from "@/actions/logot";

interface LogOutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({children} : LogOutButtonProps) => {
    const onClick = () => {
        logout();
    }
    return (
        <span onClick={onClick} className={"cursor-pointer w-full flex items-center justify-center"}>
            {children}
        </span>
    )
}