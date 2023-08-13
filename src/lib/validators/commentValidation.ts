import { z } from "zod";
import { VoteType } from "@prisma/client";

export const CreateCommentValidator = z.object({
  postId: z.string(),
  text: z.string(),
  replyToId: z.string().optional(),
});

export const CommentVoteValidator = z.object({
  commentId: z.string(),
  type: z.enum([VoteType.UP, VoteType.DOWN]),
});

export type CreateCommentRequest = z.infer<typeof CreateCommentValidator>;
export type CommentVoteRequest = z.infer<typeof CommentVoteValidator>;
