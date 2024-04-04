
import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useCurrentUser} from "@/hooks/use-current-user";

export const UserItem = () => {
    const user = useCurrentUser();
    const userName = user?.name;
    const userNickName = userName?.split(' ').map(function (s) { return s.charAt(0); }).join('');
    return (
        <div className={"flex items-center justify-between gap-2 border rounded-lg p-2"}>
            <Avatar>
                <AvatarImage src={user?.image || undefined}/>
                <AvatarFallback className={"font-semibold text-sm text-white bg-accent-foreground"}>
                    {/*Avatar User Icon*/}
                    {/*<FaUser className={"text-white text-2xl"}/>*/}
                    {userNickName}
                </AvatarFallback>
            </Avatar>
            <div className={"grow"}>
                <p className={"font-bold"}>{user?.name}</p>
                <p className={"text-xs font-semibold"}>{user?.email}</p>
            </div>
        </div>
    );
};


