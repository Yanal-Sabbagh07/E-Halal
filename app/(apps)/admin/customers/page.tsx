import React from 'react';
import {Card} from "@/components/ui/card";
import {fetchUsers} from "@/data/user";
import {UserRole} from "@prisma/client";

const Customers = async () => {
    const users = await fetchUsers(UserRole.CUSTOMER);
    return (
        <Card className={"w-full min-h-[calc(100vh-112px)] p-4"}>
            <div>
                {users.map( (user, key) => (
                    <div key={key}>
                        {user.name}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Customers;
