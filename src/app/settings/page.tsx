import { authOptions, getAuthSession } from "@/configs/authOptions";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

import React from "react";
import { redirect } from "next/navigation";
import { PathsEnum } from "@/configs/constants";
import UserNameForm from "@/components/UserNameForm";

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || PathsEnum.SIGNIN);
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid items-start gap-8">
        <h1 className="font-bold text-3xl md:text-4xl">Settings</h1>
      </div>
      <div className="grid gap-10">
        <UserNameForm username={session.user.username} />
      </div>
    </div>
  );
};

export default Page;
