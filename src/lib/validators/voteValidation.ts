import { z } from "zod";
import { VoteType } from "@prisma/client";

export const PostVoteValidator = z.object({
  postId: z.string(),
  voteType: z.enum([VoteType.UP, VoteType.DOWN]),
});

export type PostVoteRequest = z.infer<typeof PostVoteValidator>;
