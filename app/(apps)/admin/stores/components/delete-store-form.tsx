"use client";
import React, {useState, useTransition} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {deleteStoreSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {deleteStore} from "@/actions/store";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Button} from "@/components/ui/button";
export const DeleteStoreForm = ({id, name}: { id: string, name: string }) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof deleteStoreSchema>>({
        resolver: zodResolver(deleteStoreSchema),
        defaultValues: {id: id}
    });
    const onSubmit = (values: z.infer<typeof deleteStoreSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            deleteStore(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
        // router.refresh(); // Deleted the Store and closed the dialog
        window.location.assign("/admin/stores");
    };
    return (
        <CardWrapper
            headerTitle={"Delete Store"}
            headerLabel={"Are you sure you want to delete the store?"}
            backButtonLabel={"Back to Dashboard"}
            backButtonHref={"/admin/dashboard"}
            destructive
        >
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className={"space-y-4"}>
                        <FormField
                            name={"id"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"Store Name"}
                                            value={name}
                                            type="name"
                                            disabled={isPending}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button className={"w-full bg-destructive border-red-500 hover:bg-destructive/90"} type={"submit"}
                            disabled={isPending}>Delete</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};


