import React from 'react';
interface HeaderProps {
    header: string;
    label: string;
    destructive?: boolean;
}
const Header = ({label, header, destructive}: HeaderProps) => {
    return (
        <div className={"w-full flex flex-col gap-y-4 items-center justify-center"}>
            <h1 className={"text-3xl font-semibold"}> {header} </h1>
            <p className={`text-sm ${destructive ? "text-destructive" : "text-muted-foreground"}`}>{label}</p>
        </div>
    );
};

export {Header};
