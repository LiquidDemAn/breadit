export const getPostLink = (subredditName?: string, postId?: string) =>
  `/r/${subredditName}/post/${postId}`;
