"use client";

import React from 'react';
import {UserInfo} from "@/components/user-info";
import {useCurrentUser} from "@/hooks/use-current-user";
import {MaxWidthWrapper} from "@/components/max-width-wrapper";

const ClientPage = () => {
    const user = useCurrentUser();
    return (
        <MaxWidthWrapper>
            <UserInfo label={"Client Page!"} user={user}/>
        </MaxWidthWrapper>
    );
};

export default ClientPage;
