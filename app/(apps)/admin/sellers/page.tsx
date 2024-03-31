import React from 'react';
import {Card} from "@/components/ui/card";
import {fetchUsers} from "@/data/user";
import {UserRole} from "@prisma/client";

const Sellers = async () => {
    const users = await fetchUsers(UserRole.SELLER);
    return (
        <Card className={"w-full min-h-[calc(100vh-112px)] p-4"}>
            {users.map( (user, key) => (
                <div key={key}>
                    {user.name}
                </div>
            ))}
        </Card>
    );
};

export default Sellers;
