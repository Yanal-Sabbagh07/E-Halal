import { Button } from "@/components/ui/button"
import LoginButton from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
        <div className={"space-y-24 text-center"}>
            <h1 className={"text-6xl font-bold text-foreground drop-shadow-md"}>☪ Welcome to Halal Shoping</h1>
            <p className={"text-lg"}>
                Your Halal market place for shopping!
            </p>
            <div>
                <LoginButton>
                    <Button variant={"secondary"} className={"text-lg"}>Sign in</Button>
                </LoginButton>
            </div>
        </div>

    </main>
  );
};
