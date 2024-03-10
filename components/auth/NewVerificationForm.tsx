"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {CardWrapper} from "@/components/auth/card-wrapper";
import { SyncLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {newVerification} from "@/actions/new-verification";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {

        if(!token) {
            setError("missing token!");
            return;
        }
        newVerification(token).then( (data)=> {
            setSuccess(data.success);
            setError(data.error);
        }).catch(()=>{setError("Something went wrong!")});
    },[token]);

    useEffect(() => {
        onSubmit();
    },[onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (<SyncLoader />)}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    );
};


