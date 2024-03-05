"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
    href: string;
    label:string;
}
const BackButton = ({href, label}: BackButtonProps) => {
    return (
        <Button
        className={"w-full font-normal"}
        variant={"link"}
        size={"sm"}
        asChild
        >
            <Link href={href} >{label}</Link>
        </Button>
    );
};

export {BackButton};
