"use client";

import React, {useState, useTransition} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";

import {createBillboardSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Button} from "@/components/ui/button";

import {Input} from "@/components/ui/input";
import {CreateBillBoard, EditBillBoard} from "@/actions/store";
import ImageUpload from "@/components/ui/image-upload";
import {useRouter} from "next/navigation";

interface ICreateBillboardFormProps {
    storeId: string;
    billBoard: {
        id: string;
        label: string;
        imageUrl: string;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null
}

export const CreateBillboardForm = ({billBoard, storeId}: ICreateBillboardFormProps) => {
    console.log(billBoard);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof createBillboardSchema>>({
        resolver: zodResolver(createBillboardSchema),
        defaultValues: {
            id: billBoard?.id || Date.now().toString(),
            label: billBoard?.label || "",
            storeId: storeId,
            imageUrl: billBoard?.imageUrl || ""
        }
    });
    const onSubmit = (values: z.infer<typeof createBillboardSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            if (!billBoard) {
                CreateBillBoard(values).then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.success) {
                        window.location.reload();
                    }
                });
            } else {
                EditBillBoard(values).then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.success) {
                        window.location.assign(`/admin/store/${storeId}/billboards`);
                    }
                });
            }

        });

        //window.location.assign(`/admin/store/${store.id}/dashboard`); // owner is assigned and Dialog is closed
    };
    // const onDelete = (values: z.infer<typeof deleteBillboardSchema>) => {};
    return (
        <CardWrapper
            headerTitle={billBoard ? "Edit Billboard" : "Create Billboard"}
            headerLabel={billBoard ? "Edit this Billboard" : "Create a new Billboard to the store"}
            backButtonLabel={"Back to Billboard"}
            backButtonHref={`/admin/store/${storeId}/billboards`}
            className={"w-full"}
        >
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className={"space-y-4"}>
                        <FormField
                            name={"label"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"Billboard label"}
                                            type="name"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"imageUrl"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Background Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={(url) => field.onChange("")}
                                            value={field.value ? [field.value] : []}
                                            disabled={false}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button className={"w-full"} type={"submit"}
                            disabled={isPending}>{billBoard ? "Update" : "Create"}</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};




