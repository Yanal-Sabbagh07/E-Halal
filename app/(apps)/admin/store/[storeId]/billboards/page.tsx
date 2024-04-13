import React from 'react';
import BillboardLoader from "@/app/(apps)/admin/store/[storeId]/billboards/components/BillboardLoader";
import {db} from "@/lib/db";
import {BillboardCoulumn} from "@/app/(apps)/admin/store/[storeId]/billboards/components/coulumns";
import {format} from "date-fns";

interface BillboardPageProps {
    params : {
        storeId: string;
    }
}
const BillboardsPage = async ({params}: BillboardPageProps) => {
    const billboards = await db.billBoard.findMany({
        where:{
            storeId: params.storeId
        },
    orderBy:{
            createdAt:'desc'
    }
    });
    const formattedBillboard : BillboardCoulumn[] = billboards.map((item) => ({
        imageUrl: item.imageUrl,
        id: item.id,
        label:item.label,
        createdAt: format(item.createdAt, "do MMMM yyyy"),
    }));
    return (
        <div className={""}>
            <BillboardLoader billboard={formattedBillboard}/>
        </div>
    );
};

export default BillboardsPage;
