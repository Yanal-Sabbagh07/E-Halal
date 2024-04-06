"use client";

import React, {useState} from 'react';
import {useTransition} from "react";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormControl, FormField, FormItem , FormLabel,FormMessage} from "@/components/ui/form";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {ResetSchema} from "@/schemas";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {reset} from "@/actions/reset";


const ResetForm = () => {
    const[error,setError] = useState<string | undefined>();
    const[success,setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {email:""}
    });
    const onSubmit = (values: z.infer<typeof ResetSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            reset(values).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success);
            }); // send values with server actions to the server
        });
    };
    return (
        <CardWrapper headerTitle={"Forgot your password?"} headerLabel={"We will send you an email to reset it"} backButtonLabel={"Back to login"} backButtonHref={"/auth/login"} >
            <Form {...form}>
                <form className={"space-y-6"} onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={"space-y-4"}>
                        <FormField name={"email"} control={form.control} render={({field})=> (
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className={"w-full"} type={"submit"} disabled={isPending}>
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export {ResetForm};
