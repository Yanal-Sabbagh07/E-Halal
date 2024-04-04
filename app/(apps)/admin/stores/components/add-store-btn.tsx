"use client";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import React from "react";
import {AddStore} from "@/app/(apps)/admin/stores/components/add-store";

interface AddStoreBtnProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

const AddStoreBtn = ({children, mode = "modal", asChild}: AddStoreBtnProps) => {
    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className={"p-0 w-auto bg-transparent border-none"}>
                    <AddStore />
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <span  className={"cursor-pointer"}>{children}</span>
    )
};
export default AddStoreBtn;