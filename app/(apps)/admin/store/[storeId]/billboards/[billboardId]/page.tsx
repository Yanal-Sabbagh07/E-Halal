import React from 'react';
import {db} from "@/lib/db";
import {
    CreateBillboardForm
} from "@/app/(apps)/admin/store/[storeId]/billboards/[billboardId]/components/create-billboard-form";

interface IBillboardPageProps {
    params: { storeId: string ,billboardId: string,  }
}

const BillboardPage = async ({params} : IBillboardPageProps) => {
    const billBoard = await db.billBoard.findUnique({
        where:{
            id: params.billboardId
        }
    })
    return (
        <div className={"flex-col"}>
            <div className={"flex-1 space-y-4 pt-6 pb-6"}>
                {params.storeId && <CreateBillboardForm storeId={params.storeId} category={billBoard}/>}
            </div>
        </div>
    );
};

export default BillboardPage;
