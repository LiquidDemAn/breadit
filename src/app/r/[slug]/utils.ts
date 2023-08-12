import { db } from "@/lib/db";
import { GetSubscriptionProps, SubredditByName } from "@/app/r/[slug]/types";

export const getSubredditByName = async ({
  name,
  postsSubreddit,
  postsComments,
  postsVotes,
  postsAuthor,
  take,
}: SubredditByName) => {
  return db.subreddit.findFirst({
    where: { name },
    include: {
      posts: {
        include: {
          votes: postsVotes,
          author: postsAuthor,
          comments: postsComments,
          subreddit: postsSubreddit,
        },
        orderBy: {
          createdAt: "desc",
        },
        take,
      },
    },
  });
};

export const getSubredditMembers = async (name: string) => {
  return db.subscription.count({
    where: {
      subreddit: {
        name,
      },
    },
  });
};

export const getSubscription = async ({
  session,
  subredditName,
}: GetSubscriptionProps) => {
  if (!session?.user) {
    return null;
  }

  return db.subscription.findFirst({
    where: {
      subreddit: {
        name: subredditName,
      },
      user: {
        id: session?.user.id,
      },
    },
  });
};
