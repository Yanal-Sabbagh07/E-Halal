"use client";

import React from 'react';
import {useParams, useRouter} from "next/navigation";
import {Plus} from "lucide-react";

import Heading from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {CategoryColumn, columns} from "@/app/(apps)/admin/store/[storeId]/categories/components/coulumns";
import {DataTable} from "@/components/ui/data-table";
interface CategoryLoaderProps {
    category: CategoryColumn[];
}
const CategoryLoader = ({category} : CategoryLoaderProps) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className={"flex items-center justify-between mb-2"}>
                <Heading title={`Categories ${category?.length}`} description={"Manage categories of the store"}/>
                <Button
                    size={"sm"}
                    onClick={()=> router.push(`/admin/store/${params.storeId}/categories/new`)}
                >
                    <Plus className={"mr-2 h-4 w-4"}/>
                    Add New
                </Button>
            </div>
            <Separator className={"mb-0"}/>
            <DataTable columns={columns} data={category} searchKey={"name"} />
        </>
    );
};

export default CategoryLoader;
