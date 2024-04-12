"use client";

import React from 'react';
import {useParams, useRouter} from "next/navigation";
import {Plus} from "lucide-react";

import Heading from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {BillboardCoulumn, columns} from "@/app/(apps)/admin/store/[storeId]/billboards/components/coulumns";
import {DataTable} from "@/components/ui/data-table";
interface BillBoardLoaderProps {
    billboard: BillboardCoulumn[];
}
const BillBoardLoader = ({billboard} : BillBoardLoaderProps) => {
    const router = useRouter();
    const params = useParams();
    console.log(billboard);
    return (
        <>
            <div className={"flex items-center justify-between mb-2"}>
                <Heading title={`Billboards ${billboard?.length}`} description={"Manage billboards of the store"}/>
                <Button
                    size={"sm"}
                    onClick={()=> router.push(`/admin/store/${params.storeId}/billboards/new`)}
                >
                    <Plus className={"mr-2 h-4 w-4"}/>
                    Add New
                </Button>
            </div>
            <Separator className={"mb-0"}/>
            <DataTable columns={columns} data={billboard} searchKey={"label"} />
        </>
    );
};

export default BillBoardLoader;
