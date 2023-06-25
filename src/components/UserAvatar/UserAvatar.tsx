import { FC } from "react";
import { Props } from "@/components/UserAvatar/types";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Image from "next/image";
import { User } from "lucide-react";

const UserAvatar: FC<Props> = ({ user, ...avatarProps }) => {
  const { name, image } = user;

  return (
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
  );
};

export default UserAvatar;
