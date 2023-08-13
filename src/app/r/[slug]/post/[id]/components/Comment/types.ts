import { ExtendedComment } from "@/types/extendedTypes";
import { CommentVote } from "@prisma/client";

export type Props = {
  comment: ExtendedComment & { votesAmount: number; currentVote?: CommentVote };
};
