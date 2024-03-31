import {SessionProvider} from "next-auth/react";
import Navbar from "@/app/(protected)/customer/_components/navbar";
import React from "react";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {
    return (
        <div className={"h-full w-full flex flex-col gap-y-10 items-center justify-start bg-background"}>
            <SessionProvider>
                <Navbar/>
                {children}
            </SessionProvider>

        </div>
    );
};

export default ProtectedLayout;
