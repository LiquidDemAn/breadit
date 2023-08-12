import { db } from "@/lib/db";
import { getAuthSession } from "@/configs/authOptions";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/configs/constants";

export const getInitialPosts = async () => {
  const session = await getAuthSession();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  const followedCommunitiesIds = followedCommunities.map(
    ({ subredditId }) => subredditId,
  );

  return db.post.findMany({
    ...(session && {
      where: {
        subreddit: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      },
    }),

    include: {
      votes: true,
      author: true,
      subreddit: true,
      comments: true,
    },
    orderBy: { createdAt: "desc" },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });
};
