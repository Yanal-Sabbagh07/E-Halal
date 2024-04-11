"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "@/app/(apps)/admin/store/[storeId]/billboards/components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardCoulumn = {
    id: string,
    label: string,
    createdAt: string,
}
export const columns: ColumnDef<BillboardCoulumn>[] = [
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
        cell: ({row}) => <CellAction data={row.original} />
    }
]
