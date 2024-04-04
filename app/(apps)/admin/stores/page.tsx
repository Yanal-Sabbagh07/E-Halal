import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

import {Tabs, TabsContent} from "@/components/ui/tabs";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {File, ListFilter, MoreHorizontal, PlusCircle} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import {getAllStores, getStoreUsersByStorId} from "@/data/stores";
import AddStoreBtn from "@/app/(apps)/admin/stores/components/add-store-btn";


const Users = async () => {
    const stores = await getAllStores();
    if (stores) {
        const storeId = stores[0].id;
        const owners = await getStoreUsersByStorId(storeId);
        if (owners) {
            owners.map(owner => console.log("Owner", owner?.name))
        }
    }
    // const user = await currentUser();
    // console.log(user)
    // const userId = user?.id;
    // console.log(userId);
    // if(userId){
    //     const userStores = await getUserStoresByUserId(userId);
    //     console.log("User Stores = ", userStores)
    // }



    // if(stores) {
    //     const store = await getStoreByName(stores[0].name);
    //     console.log("store", store);
    //     if(store){
    //         const storeUsers = await getStoreUsersByStorId(store.id);
    //         console.log("Store Users", storeUsers);
    //         if(storeUsers){
    //             const usersIds = storeUsers.map((su) => (su.userId));
    //             console.log("usersId:", usersIds);
    //         }
    //     }
    //
    // }

    return (
        <div className="flex min-h-[calc(100vh-112px)] w-full flex-col bg-muted/50 rounded-xl">
            <main className="grid flex-1 items-start gap-4 p-4">
                <Tabs defaultValue="ALL">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 gap-1">
                                        <ListFilter className="h-3.5 w-3.5"/>
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuCheckboxItem checked>Admins</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Sellers</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Customers</DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                                <File className="h-3.5 w-3.5"/>
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                            </Button>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5"/>
                                <AddStoreBtn  asChild>
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Store</span>
                                </AddStoreBtn>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="ALL">
                        <Card>
                            <CardHeader>
                                <CardTitle>Stores</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead className="hidden md:table-cell">City</TableHead>
                                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                                            <TableHead className="hidden md:table-cell">Updated at</TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stores?.map((store) => (
                                            <TableRow key={store.id}>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Image
                                                        priority
                                                        alt="Product image"
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src="/shop.svg"
                                                        width="64"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {store.name}
                                                </TableCell>
                                                <TableCell>
                                                    {"XYZ"}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {"XYZ"}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {"XXX"}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {"XXX"}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4"/>
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <div className="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                    products
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default Users;
