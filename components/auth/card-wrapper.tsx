"use client";

import React from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import Social from "@/components/auth/social";
import {BackButton} from "@/components/auth/back-button";
import {cn} from "@/lib/utils";

interface  CardWrapperProps {
    children: React.ReactNode;
    headerTitle: string;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    destructive?: boolean;
    className?: String;
}
const CardWrapper = ({children,headerLabel,backButtonLabel,backButtonHref,showSocial, headerTitle, destructive, className}:CardWrapperProps) => {
    return (
        <Card className={cn("w-[400px] shadow-md", className )}>
            <CardHeader >
                <Header header={headerTitle}  label={headerLabel} destructive = {destructive}/>
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
