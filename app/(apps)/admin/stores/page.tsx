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
import AddStoreBtn from "@/app/(apps)/admin/stores/components/add-store-btn";
import {getUserStoresByUserId} from "@/data/user";
import {currentUserId} from "@/lib/auth";
import {redirect} from "next/navigation";
import Link from "next/link";
import {DeleteStoreMenuItem} from "@/app/(apps)/admin/stores/components/delete-store-menu-item";
import {getAllCountries} from "@/data/stores";

const StoresPage = async () => {
    const userId = await currentUserId();
    if (!userId) {
        redirect("/auth/login");
    }
    const stores = await getUserStoresByUserId(userId);
    const allCountries = await getAllCountries();

    return (
        <main className="">
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
                        {allCountries && <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5"/>
                            <AddStoreBtn countries={allCountries} asChild>
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Store</span>
                            </AddStoreBtn>
                        </Button>}
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
                                        <TableHead>Department</TableHead>
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
                                                <Link href={`/admin/store/${store.id}/dashboard`}>
                                                    <Image
                                                        priority
                                                        alt="Product image"
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src="/shop.svg"
                                                        width="64"
                                                    />
                                                </Link>
                                            </TableCell>

                                            <TableCell className="font-medium">
                                                <Link href={`/admin/store/${store.id}/dashboard`}>
                                                    {store.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {store.department}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {"XYZ"}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {store.createdAt.toLocaleDateString()}
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
                                                        <DeleteStoreMenuItem name={store.name} id={store.id}  addressId ={store.addressId}/>
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
    );
};

export default StoresPage;
