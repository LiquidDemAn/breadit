import React from "react";
import Logo from "@/components/ui/Icons/Logo";
import Link from "next/link";
import { PathsEnum } from "@/configs/constants";
import AuthForm from "@/components/AuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center space-y-6 w-full sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy
        </p>
        <AuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">
          New to Breadit?
        </p>
        <Link
          href={PathsEnum.SIGNUP}
          className="hover:text-zinc-800 text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
