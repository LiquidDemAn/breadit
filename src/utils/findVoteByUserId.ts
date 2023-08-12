import { Vote } from "@prisma/client";
import { UserSessionType } from "@/utils/useUserSession";

export const findVoteByUserId = (
  session: UserSessionType,
  votes?: Vote[] | null,
) => {
  return votes?.find((vote) => vote.userId === session?.user.id);
};
