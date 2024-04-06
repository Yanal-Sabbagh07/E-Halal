"use client"

import * as React from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";

import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    stores: { id: string; name: string; } [],
}

export function StoreSwitcher({className, stores}: StoreSwitcherProps) {
    let storeId : string = "" ;
    const pathname = usePathname();
    const getStoreId = pathname.match(/^\/admin\/store\/(\d+)/);
    if(getStoreId) {
        storeId = getStoreId[1];
    }
    const [open, setOpen] = React.useState(false);
    const currentStore = stores.find((store) => storeId === store.id);
    const [selectedStore, setSelectedStore] = React.useState({name: currentStore?.name, id: storeId});
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
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${selectedStore.name}.png`}
                                alt={selectedStore.name}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
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
                                                <Avatar className="mr-2 h-5 w-5">
                                                    <AvatarImage
                                                        src={`https://avatar.vercel.sh/${store.name}.png`}
                                                        alt={store.name}
                                                        className="grayscale"
                                                    />
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
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
