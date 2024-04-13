"use client"

import {ColumnDef} from "@tanstack/react-table"
import {CellAction} from "@/app/(apps)/admin/store/[storeId]/billboards/components/cell-action";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardCoulumn = {
    imageUrl: string,
    id: string,
    label: string,
    createdAt: string,
}
export const columns: ColumnDef<BillboardCoulumn>[] = [
    {
        id: "imageUrl",
        cell : ({row}) => <Image className={"rounded-md"} src={row.original.imageUrl} alt={"image"} width={100} height={50}/>
    },
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original}/>
    }
]
