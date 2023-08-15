import { z } from "zod";
import { VoteType } from "@prisma/client";

export const VoteValidator = z.object({
  id: z.string(),
  type: z.enum([VoteType.UP, VoteType.DOWN]),
});

export type VoteRequest = z.infer<typeof VoteValidator>;
