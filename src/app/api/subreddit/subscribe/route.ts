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

    if (subscription) {
      return new Response("You are already subscribe to this subreddit.", {
        status: 400,
      });
    }

    const result = await db.subscription.create({
      data: {
        subredditId,
        userId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not subscribe", { status: 500 });
  }
};
