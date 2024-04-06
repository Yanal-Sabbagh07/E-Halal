"use client";

import React from 'react';
import DeleteStoreDialog from "@/app/(apps)/admin/stores/components/delete-store-dialog";

export const DeleteStoreMenuItem = ({id, name}: { id: string, name: string }) => {
    return (
        <DeleteStoreDialog id={id} name={name} asChild>
            <span className={"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"}>
               Delete
            </span>
        </DeleteStoreDialog>
    );
};

