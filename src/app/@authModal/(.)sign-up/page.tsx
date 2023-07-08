import React from "react";
import AuthInterceptor from "@/components/Auth/AuthInterceptor";
import { AuthTypeEnum } from "@/types/common";

const Page = () => {
  return <AuthInterceptor authType={AuthTypeEnum.SIGNUP} />;
};

export default Page;
