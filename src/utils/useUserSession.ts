import { useSession } from "next-auth/react";
import { DefaultUser, Session } from "next-auth";

export type UserSessionType =
  | (Session & {
      user: DefaultUser & { id: string; username?: string | null | undefined };
    })
  | null;

export const useUserSession = () => {
  const { data } = useSession();
  return data as UserSessionType;
};
