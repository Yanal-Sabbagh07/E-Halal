import React, {Suspense} from 'react';
import {NewPasswordForm} from "@/components/auth/new-password-form";


const NewPassWordPage = () => {
    return (
        <Suspense>
            <NewPasswordForm/>
        </Suspense>
    );
};

export default NewPassWordPage;
