import { z } from "zod";

export const CreateCommentValidator = z.object({
  postId: z.string(),
  text: z.string(),
  replyToId: z.string().optional(),
});

export type CreateCommentRequest = z.infer<typeof CreateCommentValidator>;
