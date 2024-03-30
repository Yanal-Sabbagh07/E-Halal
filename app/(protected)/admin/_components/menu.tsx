import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    ArrowLeftRight,
    Coins,
    Cookie,
    LayoutDashboard, LogOut,
    ScatterChart,
    Settings,
    Store,
    User,
    Users, UsersRound,
    Wallet
} from "lucide-react";
import {LogoutButton} from "@/components/auth/logout-button";
import Link from "next/link";

const SideBarMenu = () => {
    const menuList = [
        {
            group: "General",
            items: [
                {
                    link: "/admin/dashboard",
                    icon: <LayoutDashboard/>,
                    text: "Dashboard"
                },
                {
                    link: "#",
                    icon: <Users/>,
                    text: "Users"
                },
                {
                    link: "#",
                    icon: <Store/>,
                    text: "Stores"
                },
                {
                    link: "#",
                    icon: <ArrowLeftRight/>,
                    text: "Transactions"
                },
                {
                    link: "#",
                    icon: <Wallet/>,
                    text: "Billing"
                },
            ]
        },
        {
            group: "Analytics",
            items: [
                {
                    link: "#",
                    icon: <Coins/>,
                    text: "Revenues"
                },
                {
                    link: "#",
                    icon: <ScatterChart/>,
                    text: "Reports"
                },
                {
                    link: "#",
                    icon: <UsersRound/>,
                    text: "Teams"
                },
            ]
        },
        {
            group: "Settings",
            items: [
                {
                    link: "/admin/settings",
                    icon: <Settings/>,
                    text: "General Settings"
                },
                {
                    link: "#",
                    icon: <Cookie/>,
                    text: "Privacy Settings"
                },
                {
                    link: "#",
                    icon: <User/>,
                    text: "Logs"
                },
            ]
        }
    ]
    return (
        <div>
            <Command>
                <CommandList>
                    {menuList.map((menu, key) => (
                        <div key={key}>
                            <CommandGroup heading={menu.group}>
                                {
                                    menu.items.map((item, itemKey) => (
                                        <Link href={item.link} key={itemKey}>
                                            <CommandItem
                                                className={"flex gap-2"}
                                            >
                                                {item.icon}
                                                {item.text}
                                            </CommandItem>
                                        </Link>
                                    ))
                                }
                            </CommandGroup>
                            <CommandSeparator />
                        </div>
                    ))}
                    <CommandGroup heading={""}>
                        <LogoutButton>
                            <CommandItem className={"flex gap-2"}>
                                <LogOut/>
                                Logout
                            </CommandItem>
                        </LogoutButton>
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
};
export default SideBarMenu;