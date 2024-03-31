"use client";

import Link from "next/link";
import Image from "next/image";

import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {UserButton} from "@/components/auth/user-button";
import {useCurrentUser} from "@/hooks/use-current-user";
import {MaxWidthWrapper} from "@/components/max-width-wrapper";

const Navbar = () => {
    const pathname = usePathname();
    const user = useCurrentUser();
    return (
        <MaxWidthWrapper >
            <nav className={"bg-foreground rounded-xl h-[60px] flex items-center justify-between "}>
                <div className={"ml-16 h-12 w-12 flex items-center justify-center"}>
                    <Image src={"/logo.webp"} alt={"logo"} width={48} height={48}/>
                </div>
                <div className={"ml-16 flex gap-x-24"}>
                    <Button asChild variant={pathname === "/seller/server" ? "default" : "outline"}>
                        <Link href={"/seller/server"}> S_Server </Link>
                    </Button>
                    <Button asChild variant={pathname === "/seller/client" ? "default" : "outline"}>
                        <Link href={"/seller/client"}> S_Client </Link>
                    </Button>
                    <Button asChild variant={pathname === "/seller/admin" ? "default" : "outline"}>
                        <Link href={"/seller/admin"}> S_Admin </Link>
                    </Button>
                </div>
                <div className={"flex gap-x-2 mr-16  items-center text-black font-semibold text-sm "}>
                    <span className={"text-white max-w-[100px] truncate"}>{user?.name}</span>
                    <UserButton/>
                </div>
            </nav>
        </MaxWidthWrapper>
    );
};

export default Navbar;
