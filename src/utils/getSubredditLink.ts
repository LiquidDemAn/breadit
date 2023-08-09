import { PathsEnum } from "@/configs/constants";

export const getSubredditLink = (subredditName?: string) =>
  `${PathsEnum.SUBREDDIT}/${subredditName}`;
