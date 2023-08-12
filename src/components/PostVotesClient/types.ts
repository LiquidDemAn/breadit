import { Vote } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  postId: string;
  initialVote?: Vote;
  initialVotesAmount: number;
};

export type useApiProps = {
  currentVote?: Vote;
  setVotesAmount: Dispatch<SetStateAction<number>>;
  setCurrentVote: Dispatch<SetStateAction<Vote | undefined>>;
};
