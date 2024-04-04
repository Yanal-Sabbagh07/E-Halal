"use client";

import React, {useState} from 'react';
import {useTransition} from "react";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Form, FormControl, FormField, FormItem , FormLabel,FormMessage} from "@/components/ui/form";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {NewPasswordSchema} from "@/schemas";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {newPassword} from "@/actions/new-password";
import {useSearchParams} from "next/navigation";


const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const[error,setError] = useState<string | undefined>();
    const[success,setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {password:""}
    });
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) =>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            newPassword(values, token).then((data)=>{
                setError(data?.error);
                setSuccess(data?.success);
            }); // send values with server actions to the server
        });
    };
    return (
        <CardWrapper headerTitle={"Request New Password"} headerLabel={"Enter a new password"} backButtonLabel={"Back to login"} backButtonHref={"/auth/login"} >
            <Form {...form}>
                <form className={"space-y-6"} onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={"space-y-4"}>
                        <FormField name={"password"} control={form.control} render={({field})=> (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"********"}
                                            type="password"
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
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export {NewPasswordForm};
