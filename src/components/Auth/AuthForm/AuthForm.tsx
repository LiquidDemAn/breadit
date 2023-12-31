"use client";
import React, { FC, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Props } from "@/components/Auth/AuthForm/types";
import { useApi } from "@/components/Auth/AuthForm/useApi";
import GoogleIcon from "@/components/ui/Icons/Google";

const AuthForm: FC<Props> = ({ wrapperClasses }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGoogle } = useApi({ setIsLoading });

  return (
    <div className={cn("flex justify-center", wrapperClasses)}>
      <Button
        isLoading={isLoading}
        onClick={loginWithGoogle}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <GoogleIcon className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default AuthForm;
