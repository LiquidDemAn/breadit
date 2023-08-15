import { NextRequest } from "next/server";
import { getAuthSession } from "@/configs/authOptions";
import { db } from "@/lib/db";
import { getVotesAmount } from "@/utils/getVotesAmount";
import { CachedPost } from "@/types/redis";
import { redis } from "@/lib/redis";
import { z } from "zod";
import { VoteValidator } from "@/lib/validators/voteValidation";

const CACHE_AFTER_UP_VOTES = 1;

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { type, id: postId } = VoteValidator.parse(body);
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session?.user.id;

    const existingVote = await db.vote.findFirst({
      where: { userId, postId },
    });

    const post = await db.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
        votes: true,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    if (existingVote) {
      if (existingVote.type === type) {
        await db.vote.delete({
          where: { userId_postId: { postId, userId } },
        });

        const votesAmount = getVotesAmount(post.votes);

        if (votesAmount >= CACHE_AFTER_UP_VOTES) {
          const cachePayload: CachedPost = {
            authorUsername: post.author.username ?? "",
            content: JSON.stringify(post.content),
            id: post.id,
            title: post.title,
            currentVote: type,
            createdAt: post.createdAt,
          };

          await redis.hset(`post:${postId}`, cachePayload);
        }
        return new Response("OK");
      }

      await db.vote.update({
        where: {
          userId_postId: { postId, userId },
        },
        data: { type },
      });

      const votesAmount = getVotesAmount(post.votes);

      if (votesAmount >= CACHE_AFTER_UP_VOTES) {
        const cachePayload: CachedPost = {
          authorUsername: post.author.username ?? "",
          content: JSON.stringify(post.content),
          id: post.id,
          title: post.title,
          currentVote: type,
          createdAt: post.createdAt,
        };

        await redis.hset(`post:${postId}`, cachePayload);
      }

      return new Response("OK");
    }

    if (!existingVote) {
      await db.vote.create({
        data: {
          postId,
          userId,
          type,
        },
      });
    }

    const votesAmount = getVotesAmount(post.votes);

    if (votesAmount >= CACHE_AFTER_UP_VOTES) {
      const cachePayload: CachedPost = {
        authorUsername: post.author.username ?? "",
        content: JSON.stringify(post.content),
        id: post.id,
        title: post.title,
        currentVote: type,
        createdAt: post.createdAt,
      };

      await redis.hset(`post:${postId}`, cachePayload);
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not register you vote, please try again!", {
      status: 500,
    });
  }
};
