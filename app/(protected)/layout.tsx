import {SessionProvider} from "next-auth/react";
import Navbar from "@/app/(protected)/_components/navbar";


interface ProtectedLayoutProps {
    children : React.ReactNode;
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return (
        <div className={"h-full w-full flex flex-col gap-y-10 items-center justify-start bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"}>
            <SessionProvider>
                <Navbar />
                {children}
            </SessionProvider>
        </div>
    );
};

export default ProtectedLayout;
