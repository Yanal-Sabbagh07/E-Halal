"use client";

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {settings} from "@/actions/settings";
import {useTransition} from "react";
import {useSession} from "next-auth/react";
const SettingsPage =  () => {
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const updateName = () => {
        startTransition(() =>  {
            settings({name : "Yanal Sabbagh"}).then(() => update());
        });
    }
    return (
        <Card className={"w-[90%]"}>
            <CardHeader>
                <p className={"text-2xl text-center font-semibold"}>Settings</p>
            </CardHeader>
            <CardContent>
                <Button disabled={isPending} onClick={updateName}>
                    Update Name
                </Button>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
