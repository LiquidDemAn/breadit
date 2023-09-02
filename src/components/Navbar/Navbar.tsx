import React from "react";
import Link from "next/link";
import Logo from "@/components/ui/Icons/Logo";
import { PathsEnum } from "@/configs/constants";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/configs/authOptions";
import UserNavigation from "@/components/UserNavigation";
import SearchBar from "@/components/SearchBar";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <header className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-10 py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href={PathsEnum.HOME} className="flex gap-2 items-center">
          <Logo className=" h-6 w-6 sm:h-8 sm:w-8" />
          <h1 className="hidden text-zinc-700 text-sm font-medium md:block">
            Breadit
          </h1>
        </Link>

        <SearchBar />

        {session?.user ? (
          <UserNavigation user={session.user} />
        ) : (
          <Link href={PathsEnum.SIGNIN} className={buttonVariants()}>
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
