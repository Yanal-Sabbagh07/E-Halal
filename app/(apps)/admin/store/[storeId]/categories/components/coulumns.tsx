"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "@/app/(apps)/admin/store/[storeId]/categories/components/cell-action";
import Image from "next/image";

export type CategoryColumn = {
    id: string,
    name: string,
    billboard: string,
    createdAt: string,
}
export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "billboard",
        cell : ({row}) => <Image className={"rounded-md"} src={row.original.billboard} alt={"image"} width={80} height={40}/>
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original} />
    }
]
