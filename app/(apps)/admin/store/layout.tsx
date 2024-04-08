import React from 'react';
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import {MaxWidthWrapper} from "@/components/max-width-wrapper";
import {currentUserId} from "@/lib/auth";
import {getUsersByRole, getUserStoresByUserId} from "@/data/user";
import {UserRole} from "@prisma/client";
import {StoreSwitcher} from "@/app/(apps)/admin/store/components/store-switcher";
import AddOwnerButton from "@/app/(apps)/admin/store/components/add-owner-button";


interface IstoreLayoutProps {
    children: React.ReactNode,
}

const StoreLayout = async ({children}: IstoreLayoutProps) => {
    const userId = await currentUserId();
    if (!userId) {
        redirect("/auth/login");
    }

    const store = await db.store.findFirst();
    if (!store) {
        redirect('/admin/stores');
    }
    const userStores = await getUserStoresByUserId(userId);
    const allSellers = await getUsersByRole(UserRole.SELLER);
    return (
        <>
            <MaxWidthWrapper className={"border rounded-xl h-14"}>
                <div className={"w-full h-full rounded-xl flex flex-row items-center justify-center"}>
                    {userStores ? <StoreSwitcher stores={userStores} /> :
                        <span className={"border px-3 py-1 rounded-xl text-sm"}>No stores!</span>}
                    <div className={"ml-auto flex items-center gap-2"}>
                        {userStores && allSellers ?  <AddOwnerButton stores={userStores} sellers={allSellers} /> : ""}
                    </div>
                </div>
            </MaxWidthWrapper>
            <MaxWidthWrapper className={"border rounded-xl pt-4 pb-4"}>
                {children}
            </MaxWidthWrapper>
        </>
    );
};

export default StoreLayout;
