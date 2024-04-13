"use client";

import React, {useState, useTransition} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";

import {createBillboardSchema, createCategorySchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Button} from "@/components/ui/button";

import {Input} from "@/components/ui/input";
import {CreateBillBoard, EditBillBoard} from "@/actions/billboard";
import ImageUpload from "@/components/ui/image-upload";
import {useRouter} from "next/navigation";
import {CreateCategory, EditCategory} from "@/actions/category";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface ICreateBillboardFormProps {
    storeId: string;
    category: {
        id: string;
        name: string;
        billboardId: string;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null,
    billBoards: {
        id: string;
        label: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        storeId: string;
    }[] | null
}

export const CreateUpdateCategoryForm = ({billBoards,category, storeId}: ICreateBillboardFormProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof createCategorySchema>>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            id: category?.id || Date.now().toString(),
            name: category?.name || "",
            billboardId: category?.billboardId || "",
            storeId: storeId,
        }
    });
    const onSubmit = (values: z.infer<typeof createCategorySchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            if (!category) {
                CreateCategory(values).then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.success) {
                        window.location.reload();
                    }
                });
            } else {
                EditCategory(values).then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.success) {
                        window.location.assign(`/admin/store/${storeId}/categories`);
                    }
                });
            }

        });

        //window.location.assign(`/admin/store/${store.id}/dashboard`); // owner is assigned and Dialog is closed
    };
    // const onDelete = (values: z.infer<typeof deleteBillboardSchema>) => {};
    return (
        <CardWrapper
            headerTitle={category ? "Edit Category" : "Create Category"}
            headerLabel={category ? "Edit this Category" : "Create a new Category to the store"}
            backButtonLabel={"Back to categories"}
            backButtonHref={`/admin/store/${storeId}/categories`}
            className={"w-full"}
        >
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className={"space-y-4"}>
                        <FormField
                            name={"name"}
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
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a seller" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billBoards?.map(billBoard => (
                                                <SelectItem key={billBoard.id} value={billBoard.id}>
                                                    {billBoard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button className={"w-full"} type={"submit"}
                            disabled={isPending}>{category ? "Update" : "Create"}</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};




