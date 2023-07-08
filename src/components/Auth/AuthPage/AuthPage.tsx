import React, { FC } from "react";
import Link from "next/link";
import { PathsEnum } from "@/configs/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import AuthContent from "@/components/Auth/AuthContent";
import { Props } from "./types";

const AuthPage: FC<Props> = ({ authType }) => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href={PathsEnum.HOME}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>
        <AuthContent authType={authType} />
      </div>
    </div>
  );
};

export default AuthPage;
