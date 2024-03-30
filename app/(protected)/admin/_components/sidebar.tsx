"use client"

import React from 'react';

import {UserItem} from "@/app/(protected)/admin/_components/user-item";
import SideBarMenu from "@/app/(protected)/admin/_components/menu";

export const SideBar = () => {
    return (
        <div className={"w-[300px] min-h-[calc(100vh-32px)] flex flex-col p-4 gap-4 rounded-xl border bg-card text-card-foreground shadow"}>
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