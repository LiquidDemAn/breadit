import { VoteType } from "@prisma/client";

export const getVotesAmount = <T>(votes: T & { type: VoteType }[]) => {
  return (
    votes.reduce((acc, cur) => {
      if (cur.type === VoteType.UP) {
        return acc + 1;
      }

      if (cur.type === VoteType.DOWN) {
        return acc - 1;
      }

      return acc;
    }, 0) || 0
  );
};
