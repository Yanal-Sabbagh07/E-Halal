"use client"

import * as React from "react"
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,

    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

import {$Enums} from "@prisma/client";
import {z} from "zod";
import { assignSellerSchema} from "@/schemas";

import {startTransition, useState, useTransition} from "react";
import {assignSeller} from "@/actions/assign";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    stores: { id: string; name: string; } [],
    sellers: {
        id: string,
        name: string | null,
        email: string | null,
        emailVerified: Date | null,
        image: string | null,
        password: string | null,
        role: $Enums.UserRole,
        isTwoFactorEnabled: boolean
    }[]
}

export function StoreSwitcher({className, stores, sellers}: StoreSwitcherProps) {

    const [open, setOpen] = React.useState(false);
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
    // const stores: { name: string , id : string}[] = [];
    // stores?.map((store) => {
    //     if (store) {
    //         stores.push({name: store.name ,id : store.id})
    //     }
    // });
    const [selectedStore, setSelectedStore] = React.useState({name: stores[0] ? stores[0].name : "", id: stores[0] ? stores[0].id : ""});
    const [selectedSeller, setSelectedSeller] = React.useState("");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    console.log("Selected Store", selectedStore);
    console.log("Selected owner", selectedSeller);
    const onSubmit = () => {
        const values = {userId: selectedSeller, storeId : selectedStore.id}
        setError("");
        setSuccess("");
        startTransition(() => {
            assignSeller(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };
    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
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
                        <CommandList  className={"min-h-0"}>
                            <CommandInput placeholder="Search Store..."/>
                            <CommandEmpty>No team found.</CommandEmpty>
                            {stores.map((store) => {
                                if (!store.name) {
                                    return
                                }
                                return (
                                    <CommandGroup key={store.name} className={"p-0 bg-gray-50"}>
                                        <CommandItem
                                            key={store.name}
                                            onSelect={() => {
                                                setSelectedStore(store);
                                                setOpen(false);
                                            }}
                                            className="text-sm h-8"
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
                                    </CommandGroup>
                                )
                            })}

                        </CommandList>
                        <CommandSeparator/>
                        <CommandList className={"min-h-0"}>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewTeamDialog(true)
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5"/>
                                        Add Seller
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                        <CommandSeparator/>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add an Owner</DialogTitle>
                    <DialogDescription>
                        Add an owner to this store
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        {/*<div className="space-y-2">*/}
                        {/*    <Label htmlFor="name">Team name</Label>*/}
                        {/*    <Input id="name" placeholder="Acme Inc."/>*/}
                        {/*</div>*/}
                        <div className="space-y-2">
                            <Label htmlFor="plan">All Sellers</Label>
                            <Select onValueChange={(value)=> setSelectedSeller(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a seller"/>
                                </SelectTrigger>
                                <SelectContent >
                                    {sellers.map(seller => (
                                        seller.email && seller.id &&
                                        <SelectItem
                                            key={seller.id}
                                            value={seller.id}
                                        >
                                            <span className="font-medium">{seller.email}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
                        Cancel
                    </Button>
                    <Button type={"submit"}  onClick={onSubmit}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}