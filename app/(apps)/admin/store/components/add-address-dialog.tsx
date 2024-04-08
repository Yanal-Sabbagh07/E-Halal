"use client";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import React from "react";
import {AddAddressForm} from "@/app/(apps)/admin/store/components/add-address-form";

interface AddAddressDialogProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
    store : {id:string, name:string};
    countries: {id: string, name: string}[],
}

const AddAddressDialog = ({store, countries,children, mode = "modal", asChild}: AddAddressDialogProps) => {
    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className={"p-0 w-auto bg-transparent border-none"}>
                    <AddAddressForm countries={countries} store={store} />
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <span  className={"cursor-pointer"}>{children}</span>
    )
};
export default AddAddressDialog;