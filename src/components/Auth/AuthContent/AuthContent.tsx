import { FC } from "react";
import { Props } from "@/components/Auth/AuthContent/types";
import Logo from "@/components/ui/Icons/Logo";
import AuthForm from "@/components/Auth/AuthForm";
import Link from "next/link";
import { getContentByAuthType } from "@/components/Auth/AuthContent/utils";

const AuthContent: FC<Props> = ({ authType }) => {
  const { linkPath, linkTitle, title, subtitle } =
    getContentByAuthType(authType);

  return (
    <div className="container mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy
        </p>
        <AuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">{subtitle}</p>
        <Link
          href={linkPath}
          className="hover:text-zinc-800 text-sm underline underline-offset-4"
        >
          {linkTitle}
        </Link>
      </div>
    </div>
  );
};

export default AuthContent;
