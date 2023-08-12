import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/configs/authOptions";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();

    const { subredditId } = SubredditSubscriptionValidator.parse(body);

    const subscription = await db.subscription.findFirst({
      where: {
        subredditId,
        userId,
      },
    });

    if (!subscription) {
      return new Response("You are not subscribed to this subreddit.", {
        status: 400,
      });
    }

    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        creatorId: userId,
      },
    });

    if (subreddit) {
      return new Response("You cant unsubscribed from your own subreddit", {
        status: 400,
      });
    }

    const result = await db.subscription.delete({
      where: {
        userId_subredditId: {
          subredditId,
          userId,
        },
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not unsubscribe", { status: 500 });
  }
};
