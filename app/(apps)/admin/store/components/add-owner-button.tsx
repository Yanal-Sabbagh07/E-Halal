"use client";
import React from 'react';
import {PlusCircle} from "lucide-react";
import AddOwnerDialog from "@/app/(apps)/admin/store/components/add-owner-dialog";
import {Button} from "@/components/ui/button";
import {Iseller} from "@/types/sellers";
import {usePathname} from "next/navigation";

interface AddOwnerButtonProps {
    stores: { id: string; name: string; } [],
    sellers: Iseller[]
}
const AddOwnerButton = ({stores, sellers} : AddOwnerButtonProps) => {
    let storeId : string = "" ;
    const pathname = usePathname();
    const getStoreId = pathname.match(/^\/admin\/store\/(\d+)/);
    if(getStoreId) {
        storeId = getStoreId[1];
    }
    const currentStore = stores.find((store) => store.id === storeId);
    if(currentStore){
        return (
            <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5"/>
                <AddOwnerDialog store={currentStore} sellers={sellers} asChild>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Assign Owner</span>
                </AddOwnerDialog>
            </Button>
        );
    }
    return (
        <></>
    )
};

export default AddOwnerButton;
