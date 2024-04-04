"use client";

import React from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import Social from "@/components/auth/social";
import {BackButton} from "@/components/auth/back-button";

interface  CardWrapperProps {
    children: React.ReactNode;
    headerTitle: string;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}
const CardWrapper = ({children,headerLabel,backButtonLabel,backButtonHref,showSocial, headerTitle}:CardWrapperProps) => {
    return (
        <Card className={"w-[400px] shadow-md "}>
            <CardHeader >
                <Header header={headerTitle}  label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel}></BackButton>
            </CardFooter>
        </Card>
    );
};

export {CardWrapper};
