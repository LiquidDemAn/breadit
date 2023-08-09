import { Comment, Post, User, Vote } from "@prisma/client";

export type Props = {
  subredditName?: string;
  post: Post & {
    author: User;
    votes: Vote[];
    comments: Comment[];
  };
};
