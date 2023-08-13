import { z } from "zod";
import { VoteType } from "@prisma/client";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer then 3 characters!" })
    .max(128, { message: "Title must be at least 128 characters" }),
  subredditId: z.string(),
  content: z.any(),
});

export const PostVoteValidator = z.object({
  postId: z.string(),
  type: z.enum([VoteType.UP, VoteType.DOWN]),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
export type PostVoteRequest = z.infer<typeof PostVoteValidator>;
