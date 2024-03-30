import {SessionProvider} from "next-auth/react";
import {currentRole} from "@/lib/auth";
import {UserRole} from "@prisma/client";
import {SideBar} from "@/app/(protected)/admin/_components/sidebar";
import {MaxWidthWrapper} from "@/components/max-width-wrapper";


interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {
    const role = await currentRole();
    return (
        <div className={"h-full w-full flex flex-col gap-y-6 items-center justify-start bg-background"}>
            {role === UserRole.ADMIN ?
                <SessionProvider>
                    <MaxWidthWrapper>
                        <section className={"w-full flex flex-row items-start justify-between gap-x-4 mt-4"}>
                            <SideBar/>
                            {children}
                        </section>
                    </MaxWidthWrapper>

                </SessionProvider>
                :
                <div className={"h-full flex items-center justify-center"}>
                    <p className={"text-destructive"}>You are not allowed to visit to visit this page</p>
                </div>
            }
        </div>
    );
};

export default ProtectedLayout;
