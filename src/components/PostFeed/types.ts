import { Post, Subreddit, Vote, User, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  subreddit: Subreddit;
  votes: Vote[];
  author: User;
  comments: Comment[];
};

export type Props = {
  initialPosts: ExtendedPost[];
  subredditName?: string;
};

export type useApiProps = {
  subredditName?: string;
  initialPosts: ExtendedPost[];
};
