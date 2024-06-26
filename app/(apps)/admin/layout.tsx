import React from "react";
import {SessionProvider} from "next-auth/react";
import {SideBar} from "@/app/(apps)/admin/components/sidebar";
import {MaxWidthWrapper} from "@/components/max-width-wrapper";
import {MainNav} from "@/app/(apps)/admin/dashboard/components/main-nav";
import {Search} from "@/app/(apps)/admin/dashboard/components/search";
import {UserNav} from "@/app/(apps)/admin/dashboard/components/user-nav";
import {currentUserId} from "@/lib/auth";
import {redirect} from "next/navigation";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {
    const userId = await currentUserId();
    if (!userId) {
        redirect("/auth/login");
    }
return (
    <div className={"h-full w-full flex flex-col gap-y-6 items-center justify-start bg-background"}>
        <SessionProvider>
            <MaxWidthWrapper>
                <section className={"w-full flex flex-row items-start justify-between gap-x-4 mt-4"}>
                    <SideBar/>
                    <div className={"flex flex-col w-full gap-4"}>
                        <div className="border rounded-xl">
                            <div className="flex h-14 items-center px-4">
                                <MainNav className="mx-0"/>
                                <div className="ml-auto flex items-center space-x-4">
                                    <Search/>
                                    <UserNav/>
                                </div>
                            </div>
                        </div>
                        {children}
                    </div>
                </section>
            </MaxWidthWrapper>
        </SessionProvider>
    </div>
);
}
;

export default ProtectedLayout;
