import { z } from "zod";
import { NAME_REGEX } from "@/configs/constants";

export const UsernameValidator = z.object({
  name: z.string().min(3).max(32).regex(NAME_REGEX),
});

export type UsernameValidationType = z.infer<typeof UsernameValidator>;
