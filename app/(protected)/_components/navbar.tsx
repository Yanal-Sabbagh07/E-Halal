"use client";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {UserButton} from "@/components/auth/user-button";
import {useCurrentUser} from "@/hooks/use-current-user";

const Navbar = () => {
    const pathname = usePathname();
    const user = useCurrentUser();
    return (
        <nav className={"bg-white rounded-xl h-[60px] flex w-[90%] items-center justify-between mt-2"}>
            <div className={"ml-16 bg-slate-900 rounded-full h-12 w-12 flex items-center justify-center text-white" }>
                Logo
            </div>

            <div className={"ml-16 flex gap-x-24"}>
                <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
                    <Link href={"/server"}> Server </Link>
                </Button>
                <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
                    <Link href={"/settings"}> Settings </Link>
                </Button>
                <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
                    <Link href={"/client"}> Client </Link>
                </Button>
                <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
                    <Link href={"/admin"}> Admin </Link>
                </Button>
            </div>

            <div className={"flex gap-x-2 mr-16  items-center text-black font-semibold text-sm"}>
                <span className={""}>{user?.name}</span>
                <UserButton />
            </div>

        </nav>
    );
};

export default Navbar;
