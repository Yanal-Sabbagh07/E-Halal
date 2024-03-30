"use client";

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {settings} from "@/actions/settings";
import {useState, useTransition} from "react";
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {SettingSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useCurrentUser} from "@/hooks/use-current-user";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserRole} from "@prisma/client";
import {Switch} from "@/components/ui/switch";

const SettingsPage = () => {
    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const {update} = useSession();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof SettingSchema>>({
        resolver: zodResolver(SettingSchema),
        defaultValues: {
            name: user?.name || undefined, // using empty string will update the db with an empty string but undefined is not going to be passed to the settings action
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
            role: user?.role || undefined,
        }
    });
    const onFormSubmit = (values: z.infer<typeof SettingSchema>) => {
        startTransition(() => {
            settings(values).then((data) => {
                if (data.error) {
                    setError(data.error);
                }
                if (data.success) {
                    update();
                    setSuccess(data.success);
                }
            }).catch(() => setError("Something went wrong!"));
        });
    }
    return (
        <div className={"w-[calc(100%-300px)]"}>
            <Card >
                <CardHeader>
                    <p className={"text-2xl text-center font-semibold"}>⚙️ Admin Settings</p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className={"space-y-6"} onSubmit={form.handleSubmit(onFormSubmit)} autoComplete="off">
                            <div className={"space-y-4"}>
                                <FormField
                                    control={form.control}
                                    name={"name"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Your Name"} disabled={isPending} {...field}
                                                       autoComplete={"none"}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                {!user?.isOAuth && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name={"email"}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={"your_name@example.com"}
                                                               disabled={isPending} {...field}
                                                               type={"email"}
                                                               autoComplete={"none"}
                                                               readOnly
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={"password"}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={"********"} disabled={isPending} {...field}
                                                               type={"password"} autoComplete={"none"}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={"newPassword"}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>New Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={"********"} disabled={isPending} {...field}
                                                               type={"password"} autoComplete={"none"}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isTwoFactorEnabled"
                                            render={({field}) => (
                                                <FormItem
                                                    className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>Two Factor Authentication</FormLabel>
                                                        <FormDescription>
                                                            Enable two factor authentication for your account
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            disabled={isPending}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}

                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </>)}
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select
                                                disabled={isPending}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a role"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={UserRole.ADMIN}>
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value={UserRole.SELLER}>
                                                        Seller
                                                    </SelectItem>
                                                    <SelectItem value={UserRole.CUSTOMER}>
                                                        Customer
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error}/>
                            <FormSuccess message={success}/>
                            <Button disabled={isPending} type={"submit"}>Save</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage;
