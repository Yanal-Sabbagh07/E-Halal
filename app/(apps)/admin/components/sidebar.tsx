"use client"

import React from 'react';

import {UserItem} from "@/app/(apps)/admin/components/user-item";
import SideBarMenu from "@/app/(apps)/admin/components/menu";

export const SideBar = () => {
    return (
        <div className={"w-[316px] min-h-[calc(100vh-32px)] flex flex-col p-4 gap-4 rounded-xl border bg-card text-card-foreground shadow"}>
            <div>
                <UserItem />
            </div>
            <div className={"grow"}>
                <SideBarMenu/>
            </div>
            <div className={""}>Settings / Notifications</div>
        </div>
    );
};
