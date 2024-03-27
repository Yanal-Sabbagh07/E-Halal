"use client";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {RoleGate} from "@/components/auth/role-gate";
import {FormSuccess} from "@/components/form-success";
import {useCurrentUser} from "@/hooks/use-current-user";
import {UserRole} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {admin} from "@/actions/admin";

const AdminPage = () => {
const user = useCurrentUser();
const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
        if(response.ok){
            toast.success("Allowed API Route!")
        } else {
            toast.error("Forbidden API Route!");
        }
    })
}
const onServerActionClick = () => {
    admin().then((data) => {
        if(data.success){
            toast.success("SERVER ACTION ACCESS ALLOWED!")
        }else {
            toast.error("SERVER ACTION ACCESS DENIED!")
        }
    })
}
    return (
        <Card className={"w-[90%] "}>
            <CardHeader>
                <p className={"text-2xl font-semibold text-center pb-4"}>
                    Admin Dashboard!
                </p>
                <CardContent className={"space-y-4 "}>
                    <RoleGate allowedRole={UserRole.ADMIN}>
                        <FormSuccess message={`Welcome back! ${user?.name}`} />
                    </RoleGate>
                    <div className={"flex flex-row items-center justify-between rounded-lg p-3 shadow-xl "}>
                        <p className={"text-sm font-medium"}>ADMIN ONLY API ROUTE</p>
                        <Button onClick={onApiRouteClick}>Click to test</Button>
                    </div>
                    <div className={"flex flex-row items-center justify-between rounded-lg p-3 shadow-xl"}>
                        <p className={"text-sm font-medium"}>ADMIN ONLY Server Action</p>
                        <Button onClick={onServerActionClick}>Click to test</Button>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    );
};

export default AdminPage;
