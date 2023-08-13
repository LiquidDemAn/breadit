import { CommentVote, Comment, User } from "@prisma/client";

export type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};
