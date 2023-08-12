import { ExtendedPost } from "@/types/post";

export type Props = {
  subredditName?: string;
  initialPosts: ExtendedPost[];
};

export type useApiProps = Props;
