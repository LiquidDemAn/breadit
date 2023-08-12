import { Vote } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  postId: string;
  initialVotesAmount: number;
  initialVote?: Vote;
};

export type useApiProps = {
  currentVote?: Vote;
  setCurrentVote: Dispatch<SetStateAction<Vote | undefined>>;
  setVotesAmount: Dispatch<SetStateAction<number>>;
};
