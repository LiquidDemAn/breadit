import React from "react";
import Link from "next/link";
import { PathsEnum } from "@/configs/constants";
import { cn } from "@/configs/utils";
import { buttonVariants } from "@/components/ui/Button";
import SignIn from "@/components/SignIn";

const SignInPage = () => {
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
          Home
        </Link>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
