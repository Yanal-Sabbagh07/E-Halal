import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getAllUsers, getUsersByRole} from "@/data/user";
import {UserRole} from "@prisma/client";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
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
import {Badge} from "@/components/ui/badge";

const Users = async () => {
    const customers = await getUsersByRole(UserRole.CUSTOMER);
    const sellers = await getUsersByRole(UserRole.SELLER);
    const admins = await getUsersByRole(UserRole.ADMIN);
    const users = await getAllUsers();
    return (
        <div className="flex min-h-[calc(100vh-112px)] w-full flex-col bg-muted/50 rounded-xl">
            <main className="grid flex-1 items-start gap-4 p-4">
                <Tabs defaultValue="ALL">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="ALL" className="hidden sm:flex">All</TabsTrigger>
                            <TabsTrigger value="ADMIN">Admins</TabsTrigger>
                            <TabsTrigger value="SELLER">Sellers</TabsTrigger>
                            <TabsTrigger value="CUSTOMER">Customers</TabsTrigger>
                        </TabsList>
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
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="ALL">
                        <Card>
                            <CardHeader>
                                <CardTitle>Users</CardTitle>
                                {/*<CardDescription>*/}
                                {/*    Manage your users.*/}
                                {/*</CardDescription>*/}
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead className="hidden md:table-cell">Email</TableHead>
                                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                                            <TableHead className="hidden md:table-cell">Two Factor</TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users?.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Image
                                                        alt="Product image"
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src={user.role === UserRole.CUSTOMER ? "/avatars/02.png" : "/avatars/04.png"}
                                                        width="64"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {user.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{user.role}</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {user.emailVerified?.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {user.isTwoFactorEnabled ? "ON" : "OFF"}
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
                    <TabsContent value="ADMIN">
                        <Card>
                            <CardHeader>
                                <CardTitle>Admins</CardTitle>
                                {/*<CardDescription>*/}
                                {/*    Manage your users.*/}
                                {/*</CardDescription>*/}
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead className="hidden md:table-cell">Email</TableHead>
                                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                                            <TableHead className="hidden md:table-cell">Two Factor</TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {admins?.map((admin) => (
                                            <TableRow key={admin.id}>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Image
                                                        alt="Product image"
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src="/avatars/04.png"
                                                        width="64"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {admin.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{admin.role}</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {admin.email}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {admin.emailVerified?.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {admin.isTwoFactorEnabled ? "ON" : "OFF"}
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
                    <TabsContent value="SELLER">
                        <Card>
                            <CardHeader>
                                <CardTitle>Users</CardTitle>
                                {/*<CardDescription>*/}
                                {/*    Manage your users.*/}
                                {/*</CardDescription>*/}
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead className="hidden md:table-cell">Email</TableHead>
                                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                                            <TableHead className="hidden md:table-cell">Two Factor</TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sellers?.map((seller) => (
                                            <TableRow key={seller.id}>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Image
                                                        alt="Product image"
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src="/avatars/04.png"
                                                        width="64"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {seller.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{seller.role}</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {seller.email}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {seller.emailVerified?.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {seller.isTwoFactorEnabled ? "ON" : "OFF"}
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
                    <TabsContent value="CUSTOMER">
                        <Card>
                            <CardHeader>
                                <CardTitle>Users</CardTitle>
                                {/*<CardDescription>*/}
                                {/*    Manage your users.*/}
                                {/*</CardDescription>*/}
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead className="hidden md:table-cell">Email</TableHead>
                                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                                            <TableHead className="hidden md:table-cell">Two Factor</TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {customers?.map((customer) => (
                                            <TableRow key={customer.id}>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Image
                                                        alt="Product image"
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src="/avatars/02.png"
                                                        width="64"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {customer.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{customer.role}</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {customer.email}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {customer.emailVerified?.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {customer.isTwoFactorEnabled ? "ON" : "OFF"}
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
