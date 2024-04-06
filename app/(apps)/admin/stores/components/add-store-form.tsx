"use client";
import React, {useState, useTransition} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {addStoreSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {addStore} from "@/actions/store";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


export const AddStoreForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [storeId] = useState(Date.now());
    const formInstance = useForm<z.infer<typeof addStoreSchema>>({
        resolver: zodResolver(addStoreSchema),
        defaultValues: {id:storeId.toString() , name: ""},
    });
    const onSubmit = (values: z.infer<typeof addStoreSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            addStore(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
        router.push(`/admin/store/${storeId}/dashboard`);
    };
    return (
        <CardWrapper headerTitle={"New Store"} headerLabel={"Add a new store"} backButtonLabel={"Back to Dashboard"} backButtonHref={"/admin/dashboard"} >
            <Form {...formInstance}>
                <form
                    className={"space-y-6"}
                    onSubmit={formInstance.handleSubmit(onSubmit)}
                >
                    <div className={"space-y-4"}>
                        <FormField
                            name={"name"}
                            control={formInstance.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"Store Name"}
                                            type="name"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className={"w-full"} type={"submit"} disabled={isPending}>Add</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};


