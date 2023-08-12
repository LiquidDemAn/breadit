import { NextRequest } from "next/server";
import { getAuthSession } from "@/configs/authOptions";
import { db } from "@/lib/db";
import { z } from "zod";

const enum SearchParams {
  PAGE = "page",
  LIMIT = "limit",
  SUBREDDIT_NAME = "subredditName",
}

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const session = await getAuthSession();

  const followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subreddit: true,
      },
    });

    followedCommunities.forEach(({ subredditId }) =>
      followedCommunitiesIds.push(subredditId),
    );
  }

  try {
    const { subredditName, limit, page } = z
      .object({
        page: z.string(),
        limit: z.string(),
        subredditName: z.string().nullish().optional(),
      })
      .parse({
        [SearchParams.PAGE]: url.searchParams.get(SearchParams.PAGE),
        [SearchParams.LIMIT]: url.searchParams.get(SearchParams.LIMIT),
        [SearchParams.SUBREDDIT_NAME]: url.searchParams.get(
          SearchParams.SUBREDDIT_NAME,
        ),
      });

    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const posts = await db.post.findMany({
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subreddit: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: {
        subreddit: {
          ...(session && {
            id: {
              in: followedCommunitiesIds,
            },
          }),
          ...(subredditName && { name: subredditName }),
        },
      },
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch more posts", { status: 500 });
  }
};
