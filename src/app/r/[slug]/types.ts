import { UserSessionType } from "@/utils/useUserSession";

type Params = {
  slug: string;
};

export type PageProps = {
  params: Params;
};

export type LayoutProps = {
  params: Params;
};

export type SubredditByName = {
  name: string;
  take?: number;
  postsVotes?: boolean;
  postsAuthor?: boolean;
  postsComments?: boolean;
  postsSubreddit?: boolean;
};

export type GetSubscriptionProps = {
  session?: UserSessionType;
  subredditName: string;
};
