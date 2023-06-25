import { User } from "next-auth";
import { AvatarProps } from "@radix-ui/react-avatar";

export type Props = {
  user: Pick<User, "image" | "name">;
} & AvatarProps;
