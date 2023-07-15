import { PathsEnum } from "@/configs/constants";
import { DefaultUser, Session } from "next-auth";

export type MenuItemType = {
  href: PathsEnum;
  label: string;
  hasSeparator?: boolean;
};

export enum AuthTypeEnum {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP",
}

export type UserSessionType =
  | (Session & {
      user: DefaultUser & { id: string; username?: string | null | undefined };
    })
  | null;
