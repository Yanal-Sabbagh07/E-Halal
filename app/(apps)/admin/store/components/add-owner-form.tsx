"use client";

import React, {useState, useTransition} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";

import {assignSellerSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {assignSeller} from "@/actions/assign";
import {$Enums} from "@prisma/client";
import {Input} from "@/components/ui/input";

interface AddOwnerProps {
    store : {id: string, name: string};
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
export const AddOwnerForm = ({store, sellers}: AddOwnerProps) => {
    const {id, name} = store ;
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof assignSellerSchema>>({
        resolver: zodResolver(assignSellerSchema),
        defaultValues: {storeId: id, userId: ""}
    });
    const onSubmit = (values: z.infer<typeof assignSellerSchema>) => {
        console.log("values", values)
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
        <CardWrapper headerTitle={"Assign Owner"} headerLabel={"Add a new seller to the store"} backButtonLabel={"Back to Stores"} backButtonHref={`/admin/stores`} >
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className={"space-y-4"}>
                        <FormField
                            name={"storeId"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={name}
                                            value={name}
                                            type="name"
                                            disabled={true}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a seller" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sellers.map(seller => (
                                                <SelectItem key={seller.id} value={seller.id}>
                                                    {seller.email}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className={"w-full"} type={"submit"} disabled={isPending}>Assign</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};




