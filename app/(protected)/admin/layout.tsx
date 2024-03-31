import React from "react";
import {SessionProvider} from "next-auth/react";
import {SideBar} from "@/app/(protected)/admin/_components/sidebar";
import {MaxWidthWrapper} from "@/components/max-width-wrapper";


interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {
    return (
        <div className={"h-full w-full flex flex-col gap-y-6 items-center justify-start bg-background"}>
            <SessionProvider>
                <MaxWidthWrapper>
                    <section className={"w-full flex flex-row items-start justify-between gap-x-4 mt-4"}>
                        <SideBar/>
                        {children}
                    </section>
                </MaxWidthWrapper>
            </SessionProvider>
        </div>
    );
};

export default ProtectedLayout;
