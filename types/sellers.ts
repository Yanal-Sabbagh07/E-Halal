import {$Enums} from "@prisma/client";

export interface Iseller {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: $Enums.UserRole;
    isTwoFactorEnabled: boolean;
}