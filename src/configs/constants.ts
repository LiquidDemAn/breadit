/* eslint-disable */

export enum QueryKeys {
  INFINITY_QUERY = "INFINITY_QUERY",
}

export enum PathsEnum {
  HOME = "/",
  SIGNIN = "/sign-in",
  SIGNUP = "/sign-up",
  CREATECOMMUNITY = "/r/create",
  SUBREDDIT = "/r",
  SETTINGS = "/settings",
}

export enum ApiEndpoints {
  SUBREDDIT = "/api/subreddit",
  SUBSCRIBE = "/api/subreddit/subscribe",
  UNSUBSCRIBE = "/api/subreddit/unsubscribe",
  LINK = "/api/link",
  CREATE_POST = "/api/subreddit/post/create",
  VOTE = "/api/subreddit/post/vote",
  CREATE_COMMENT = "/api/subreddit/post/comment",
}

export const INFINITE_SCROLLING_PAGINATION_RESULTS = 2;
