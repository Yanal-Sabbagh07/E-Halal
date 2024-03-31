import {currentUser} from "@/lib/auth";
import {UserInfo} from "@/components/user-info";
import {MaxWidthWrapper} from "@/components/max-width-wrapper";

const ServerPage = async () => {
    const user = await currentUser();
    return (
        <MaxWidthWrapper>
            <UserInfo user={user} label={" Server Component!"}/>
        </MaxWidthWrapper>
    )
}

export default ServerPage;