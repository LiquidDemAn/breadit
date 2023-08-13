import { UserSessionType } from "@/utils/useUserSession";

export const getCurrentVote = <T>(
  votes: (T & { userId: string })[],
  session: UserSessionType,
) => {
  return votes.find((vote) => vote.userId === session?.user.id);
};
