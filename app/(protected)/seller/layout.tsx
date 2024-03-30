import {SessionProvider} from "next-auth/react";
import Navbar from "@/app/(protected)/seller/_components/navbar";
import {currentRole} from "@/lib/auth";
import {UserRole} from "@prisma/client";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {
    const role = await currentRole();
    return (
        <div className={"h-full w-full flex flex-col gap-y-10 items-center justify-start bg-background"}>
            {role === UserRole.SELLER ?
                <SessionProvider>
                    <Navbar/>
                    {children}
                </SessionProvider>
                :
                <div className={"h-full flex items-center justify-center"}>
                    <p className={"text-destructive"}>You are not allowed to visit to visit this page</p>
                </div>
            }
        </div>
    )
        ;
};

export default ProtectedLayout;
