import { z } from "zod";
import { VoteType } from "@prisma/client";

export const CommentVoteValidator = z.object({
  commentId: z.string(),
  voteType: z.enum([VoteType.UP, VoteType.DOWN]),
});

export type CommentVoteRequest = z.infer<typeof CommentVoteValidator>;
