"use client";
import React from 'react';
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import AddAddressDialog from "@/app/(apps)/admin/store/components/add-address-dialog";

interface AddAddressButtonProps {
    countries: {id: string, name: string}[],
    stores: { id: string; name: string; } [];
}
const AddAddressButton = ({countries, stores} : AddAddressButtonProps ) => {
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
                <AddAddressDialog store ={currentStore} countries={countries} asChild>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Assign Address</span>
                </AddAddressDialog>
            </Button>
        );
    }
    return (
        <></>
    )
};

export default AddAddressButton;
