"use client"

import * as React from "react";
import {usePathname} from 'next/navigation'
import Link from "next/link";

import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useEffect} from "react";
import {Ham, Store} from "lucide-react";
import {Department} from "@prisma/client";
import {GiPerfumeBottle} from "react-icons/gi";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    stores: { id: string; name: string; department: Department} [],
}

export function StoreSwitcher({className, stores}: StoreSwitcherProps) {
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();
    const getStoreID = () => {
        const path = pathname.match(/^\/admin\/store\/(\d+)/);
        if (path) {
            return path[1];
        }
        return "";
    }
    const storeId = getStoreID();
    const currentStore = stores.find((store) => store.id === storeId);
    const [selectedStore, setSelectedStore] = React.useState({name: currentStore?.name, id: storeId});
    useEffect(() => {
        const currentStore = stores.find((store) => store.id === storeId);
        setSelectedStore({name: currentStore?.name, id: storeId});
    }, [storeId, stores]);
    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn("w-[200px] justify-between", className)}
                    >
                        <Store className={"mr-2 h-5 w-5"} />
                        {selectedStore.name}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 ">
                    <Command className={"min-h-0"}>
                        <CommandList className={"min-h-0"}>
                            <CommandInput placeholder="Search Store..."/>
                            <CommandEmpty>No team found.</CommandEmpty>
                            {stores.map((store) => {
                                if (!store.name) {
                                    return;
                                }
                                return (
                                    <CommandGroup key={store.name} className={"p-0 bg-gray-50"}>
                                        <Link href={`/admin/store/${store.id}/dashboard`}>
                                            <CommandItem
                                                key={store.name}
                                                className="text-sm h-8"
                                                onSelect={() => {
                                                    setSelectedStore(store);
                                                    setOpen(false);
                                                }}
                                            >
                                                {store.department === Department.Meat ? <Ham className={"mr-2 h-5 w-5"}/> : store.department === Department.Perfume ? <GiPerfumeBottle className={"mr-2 h-5 w-5"}/> : <Store className={"mr-2 h-5 w-5"}/>}
                                                {store.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        selectedStore.name === store.name
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        </Link>
                                    </CommandGroup>
                                )
                            })}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}
