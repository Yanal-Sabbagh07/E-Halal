"use client";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import React from "react";
import {AddOwnerForm} from "@/app/(apps)/admin/store/components/add-owner-form";
import {Iseller} from "@/types/sellers";

interface AddOwnerBtnProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
    store : {id:string, name:string};
    sellers: Iseller[]
}

const AddOwnerDialog = ({store, sellers,children, mode = "modal", asChild}: AddOwnerBtnProps) => {
    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className={"p-0 w-auto bg-transparent border-none"}>
                    <AddOwnerForm  store={store} sellers={sellers}/>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <span  className={"cursor-pointer"}>{children}</span>
    )
};
export default AddOwnerDialog;