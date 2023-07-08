import React from "react";
import { AuthTypeEnum } from "@/types/common";
import AuthPage from "@/components/Auth/AuthPage/AuthPage";

const SignInPage = () => {
  return <AuthPage authType={AuthTypeEnum.SIGNUP} />;
};

export default SignInPage;
