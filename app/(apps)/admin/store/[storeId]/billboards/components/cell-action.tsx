"use client";

import {BillboardCoulumn} from "@/app/(apps)/admin/store/[storeId]/billboards/components/coulumns";
import React, {useState, useTransition} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Delete, Edit, MoreHorizontal, Trash} from "lucide-react";
import {useParams, usePathname, useRouter} from "next/navigation";
import {DeleteBillBoard} from "@/actions/store";

interface CellActionProps {
    data: BillboardCoulumn;
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const params = useParams();
    const {storeId} = params;
    console.log(data)
    const onDelete = () => {
        setError("");
        setSuccess("");
        startTransition(() => {
            DeleteBillBoard({id: data.id}).then((res) => {
                if(res.success){
                    window.location.reload();
                }
                console.error(error);
            });
        });
    }
    const onUpdate = () => {

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className={"h-8 w-8 p-0"}>
                    <span className={"sr-only"}> Open Menu</span>
                    <MoreHorizontal className={"h-4 w-4"}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => router.push(`/admin/store/${storeId}/billboards/${data.id}`)}>
                    <Edit className={"h-4 w-4 mr-2"}/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>
                    <Trash className={"w-4 h-4 me-2"}/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}