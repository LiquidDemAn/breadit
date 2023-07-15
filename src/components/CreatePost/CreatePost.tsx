"use client";
import React, { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Props } from "@/components/CreatePost/types";
import UserAvatar from "@/components/UserAvatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageIcon, Link2 } from "lucide-react";

const CreatePost: FC<Props> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = () => {
    router.push(`${pathname}/submit`);
  };

  return (
    <li className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <UserAvatar
          onlineStatus
          user={{ name: session?.user.name, image: session?.user.image }}
        />

        <Input readOnly onClick={onSubmit} placeholder="Create post" />
        <Button onClick={onSubmit} variant="ghost">
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button onClick={onSubmit} variant="ghost">
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  );
};

export default CreatePost;
