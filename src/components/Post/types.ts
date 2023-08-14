import { ExtendedPost } from "@/types/post";
import { UserSessionType } from "@/utils/useUserSession";

export type Props = {
  post: ExtendedPost;
  subredditName?: string;
  session: UserSessionType;
};
