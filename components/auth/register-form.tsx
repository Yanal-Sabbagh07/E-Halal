"use client";

import React, {useState} from 'react';
import {useTransition} from "react";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem , FormLabel,FormMessage} from "@/components/ui/form";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {RegisterSchema} from "@/schemas";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {register} from "@/actions/register";


const RegisterForm = () => {
    const[error,setError] = useState<string | undefined>("");
    const[success,setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {email:"", password: "", name:""}
    });
    const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            register(values).then((data)=>{
                setError(data.error);
                setSuccess(data.success);
            }); // send values with server actions
        });
    };
    return (
        <CardWrapper headerLabel={"Welcome To Halal"} backButtonLabel={"Already have an account?"} backButtonHref={"/auth/login"} showSocial>
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className={"space-y-4"}>
                        <FormField
                            name={"name"}
                            control={form.control}
                            render={({field})=> (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"Mohammad Ali"}
                                            type="name"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"email"}
                            control={form.control}
                            render={({field})=> (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"mohammad_ali@example.com"}
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"password"}
                            control={form.control}
                            render={({field})=> (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"********"}
                                            type={"password"}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className={"w-full"} type={"submit"} disabled={isPending}>Register</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export {RegisterForm};
