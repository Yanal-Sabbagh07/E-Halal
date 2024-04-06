import React from 'react';
import {db} from "@/lib/db";
import {redirect} from "next/navigation";

interface IStorePageProps {
    params:{storeId: string}
}
const StorePage = async ({params}: IStorePageProps) => {
    const storeId = params.storeId;
    const store = await db.store.findFirst({
        where:{
            id: storeId,
        }
    })
    if(!store){
        redirect('/admin/stores');
    }

    return (
        <div className={"flex min-h-[calc(100vh-212px)] w-full flex-col items-center justify-center bg-accent rounded-xl"}>
            <div className={""}>
                {store.name}
            </div>

        </div>
    );
};

export default StorePage;
