"use client";

import React, {useState} from 'react';
import {useTransition} from "react";
import { useForm } from "react-hook-form";
import {useSearchParams} from "next/navigation";
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
import Link from "next/link";

const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email is already in use with diffrent provider"
        : "";

    const[error,setError] = useState<string | undefined>("");
    const[success,setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const[showTwoFactor,setShowTwoFactor] = useState<boolean>(false);


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {email:"", password: "", code: ""}
    });
    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        // axios.post("/my/api/route", values).then send values with api route
        setError("");
        setSuccess("");
        startTransition(()=>{
            login(values).then((data)=>{
                if(data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
                if(data?.twoFactor) {
                    setShowTwoFactor(true);
                }
            }).catch( () => setError("Something went wrong!") );
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
                        {showTwoFactor && (
                            <FormField name={"code"} control={form.control} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={"123456"}
                                            disabled={isPending}
                                            type={"string"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        )}
                        {!showTwoFactor && (
                            <>
                                <FormField name={"email"} control={form.control} render={({field}) => (
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <FormField name={"password"} control={form.control} render={({field}) => (
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
                                        <Button size={"sm"} variant={"link"} asChild className={"px-0 font-normal"}>
                                            <Link href={"/auth/reset"}> Forgot your Password?</Link>
                                        </Button>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </>
                        )
                        }
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        className={"w-full"}
                        type={"submit"}
                        disabled={isPending}
                    >{showTwoFactor ? "confirm" : "Login"}</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export {LoginForm};
