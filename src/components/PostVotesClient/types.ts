import { VoteType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  postId: string;
  initialVotesAmount: number;
  initialVote?: { postId: string; voteType: VoteType } | null;
};

export type useApiProps = {
  currentVote?: { postId: string; voteType: VoteType } | null;
  setCurrentVote: Dispatch<
    SetStateAction<{ postId: string; voteType: VoteType } | null | undefined>
  >;
  setVotesAmount: Dispatch<SetStateAction<number>>;
};
