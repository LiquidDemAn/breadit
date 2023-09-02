import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/configs/authOptions";
import { db } from "@/lib/db";
import { z } from "zod";
import { PostValidation } from "@/lib/validators/postValidation";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();

    const { subredditId, title, content } = PostValidation.parse(body);

    const subscription = await db.subscription.findFirst({
      where: {
        subredditId,
        userId,
      },
    });

    if (!subscription) {
      return new Response("Subscribe to post!.", {
        status: 400,
      });
    }

    const result = await db.post.create({
      data: {
        title,
        content,
        authorId: userId,
        subredditId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response(
      "Could not post to subreddit at this time, please try again later",
      { status: 500 },
    );
  }
};
