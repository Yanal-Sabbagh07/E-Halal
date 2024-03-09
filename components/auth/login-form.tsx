"use client";

import React, {useState} from 'react';
import {useTransition} from "react";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem , FormLabel,FormMessage} from "@/components/ui/form";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {LoginSchema} from "@/schemas";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {login} from "@/actions/login";

const LoginForm = () => {
    const[error,setError] = useState<string | undefined>("");
    const[success,setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {email:"", password: ""}
    });
    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        // axios.post("/my/api/route", values).then send values with api route
        setError("");
        setSuccess("");
        startTransition(()=>{
            login(values).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success);
            }); // send values with server actions
        });
    };
    return (
        <CardWrapper headerLabel={"Welcome back"} backButtonLabel={"Don't have an account?"} backButtonHref={"/auth/register"} showSocial>
            <Form {...form}>
                <form
                    className={"space-y-6"}
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className={"space-y-4"}>
                        <FormField
                            name={"email"}
                            control={form.control}
                            render={({field})=> (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"Yourname@example.com"}
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
                    <Button
                        className={"w-full"}
                        type={"submit"}
                        disabled={isPending}
                    >Login</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export {LoginForm};
