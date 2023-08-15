import { CommentVote, Vote } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export enum ComponentTypeEnum {
  POST = "POST",
  COMMENT = "COMMENT",
}

export type Props = {
  id: string;
  initialVotesAmount: number;
  initialVote?: Vote | CommentVote;
  componentType: ComponentTypeEnum;
};

export type useApiProps = {
  componentType: ComponentTypeEnum;
  currentVote?: Vote | CommentVote;
  setVotesAmount: Dispatch<SetStateAction<number>>;
  setCurrentVote: (value: Vote | CommentVote | undefined) => void;
};
