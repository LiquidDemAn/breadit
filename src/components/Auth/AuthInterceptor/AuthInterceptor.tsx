import React, { FC } from "react";
import CloseModal from "@/components/ui/CloseModal";
import { Props } from "@/components/Auth/AuthInterceptor/types";
import AuthContent from "@/components/Auth/AuthContent";

const AuthInterceptor: FC<Props> = ({ authType }) => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg justify-center">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          <AuthContent authType={authType} />
        </div>
      </div>
    </div>
  );
};

export default AuthInterceptor;
