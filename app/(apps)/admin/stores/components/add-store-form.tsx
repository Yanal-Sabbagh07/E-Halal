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
import {Department} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


export const AddStoreForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [storeId] = useState(Date.now());
    const departments = [Department.Supermarket, Department.Meat, Department.Perfume];
    const formInstance = useForm<z.infer<typeof addStoreSchema>>({
        resolver: zodResolver(addStoreSchema),
        defaultValues: {id: storeId.toString(), name: "", department: Department.Supermarket}
    });
    const onSubmit = (values: z.infer<typeof addStoreSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            addStore(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
                if(data.success) {
                    window.location.assign(`/admin/store/${storeId}/dashboard`);
                }
            });
        });
    };
    return (
        <CardWrapper headerTitle={"Create New Store"} headerLabel={""} backButtonLabel={"Back to stores"} backButtonHref={"/admin/store/1/dashboard"}>
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
                        <FormField
                            control={formInstance.control}
                            name="department"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Department"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {departments.map(department => (
                                                <SelectItem key={department} value={department}>
                                                    {department}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button className={"w-full"} type={"submit"} disabled={isPending}>Create</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};


