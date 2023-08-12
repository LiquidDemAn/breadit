import { CachedPost } from "@/types/redis";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";

export const getPost = async (id: string) => {
  const cachedPost = (await redis.hgetall(`post:${id}`)) as CachedPost;

  if (!cachedPost) {
    const post = await db.post.findFirst({
      where: {
        id,
      },
      include: {
        votes: true,
        author: true,
      },
    });

    return { post, cachedPost };
  }

  return { cachedPost };
};
