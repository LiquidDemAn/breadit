import { ExtendedPost } from "@/types/post";

export type Props = {
  initialPosts: ExtendedPost[];
  subredditName?: string;
};

export type useApiProps = Props;
