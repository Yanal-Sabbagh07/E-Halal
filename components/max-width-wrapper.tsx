import React from 'react';
import {cn} from "@/lib/utils";

interface MaxWidthWrapperProps {
    className?: string;
    children: React.ReactNode;
}
export const MaxWidthWrapper = ({className,children}: MaxWidthWrapperProps) => {
    return (
        <div className={cn('mx-auto w-full max-w-screen-[1920px] px-4', className)}>
            {children}
        </div>
    );
};


