import { CommentVote } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  commentId: string;
  initialVote?: CommentVote;
  initialVotesAmount: number;
};

export type useApiProps = {
  currentVote?: CommentVote;
  setVotesAmount: Dispatch<SetStateAction<number>>;
  setCurrentVote: Dispatch<SetStateAction<CommentVote | undefined>>;
};
