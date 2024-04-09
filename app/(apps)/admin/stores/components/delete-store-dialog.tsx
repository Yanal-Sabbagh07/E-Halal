"use client";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import React from "react";
import {DeleteStoreForm} from "@/app/(apps)/admin/stores/components/delete-store-form";

interface AddStoreBtnProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
    id: string;
    name: string;
    addressId : string;
}

const DeleteStoreButton = ({id,name, addressId ,children, mode = "modal", asChild}: AddStoreBtnProps) => {
    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className={"p-0 w-auto bg-transparent border-none"}>
                    <DeleteStoreForm id={id} name={name} addressId={addressId}/>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <span  className={"cursor-pointer"}>{children}</span>
    )
};
export default DeleteStoreButton;