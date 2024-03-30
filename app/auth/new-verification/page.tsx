import React, {Suspense} from 'react';
import {NewVerificationForm} from "@/components/auth/NewVerificationForm";

const NewVerificationPage = () => {
    return (
        <Suspense>
            <NewVerificationForm/>
        </Suspense>
    );
};

export default NewVerificationPage;
