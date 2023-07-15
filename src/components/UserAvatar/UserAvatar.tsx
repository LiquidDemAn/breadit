import React, { FC } from "react";
import { Props } from "@/components/UserAvatar/types";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Image from "next/image";
import { User } from "lucide-react";

const UserAvatar: FC<Props> = ({
  user,
  onlineStatus = false,
  ...avatarProps
}) => {
  const { name, image } = user;

  return (
    <div className="relative h-fit">
      <Avatar {...avatarProps}>
        {image ? (
          <div className="relative aspect-square h-full w-full">
            <Image
              src={image}
              alt={name || "user"}
              referrerPolicy="no-referrer"
              fill
            />
          </div>
        ) : (
          <AvatarFallback>
            <span className="sr-only">{name}</span>
            <User className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      {onlineStatus && (
        <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
      )}
    </div>
  );
};

export default UserAvatar;
