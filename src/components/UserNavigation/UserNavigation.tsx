"use client";
import { FC } from "react";
import { Props } from "@/components/UserNavigation/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import { menuItems } from "@/components/UserNavigation/utils";
import { signOut } from "next-auth/react";
import { PathsEnum } from "@/configs/constants";

const UserNavigation: FC<Props> = ({ user }) => {
  const { name, email } = user;
  const callbackUrl = `${window.location.origin}${PathsEnum.SIGNIN}`;

  const onSignOut = (event: Event) => {
    event.preventDefault();
    signOut({ callbackUrl });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} className="h-8 w-8" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {name && <p className="font-medium">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {menuItems.map(({ href, label, hasSeparator }) => (
          <>
            <DropdownMenuItem key={label} asChild>
              <Link href={href}>{label}</Link>
            </DropdownMenuItem>
            {hasSeparator && <DropdownMenuSeparator />}
          </>
        ))}
        <DropdownMenuItem onSelect={onSignOut} className="cursor-pointer">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavigation;
