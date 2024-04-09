"use client";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import React from "react";
import {AddStoreForm} from "@/app/(apps)/admin/stores/components/add-store-form";

interface AddStoreBtnProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
    countries: { id: string, name: string }[],
}

const AddStoreBtn = ({children, mode = "modal", asChild, countries}: AddStoreBtnProps) => {
    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className={"p-0 w-auto bg-transparent border-none"}>
                    <AddStoreForm countries = {countries} />
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <span  className={"cursor-pointer"}>{children}</span>
    )
};
export default AddStoreBtn;