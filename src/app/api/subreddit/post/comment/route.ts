import { NextRequest } from "next/server";
import { CreateCommentValidator } from "@/lib/validators/commentValidation";
import { getAuthSession } from "@/configs/authOptions";
import { db } from "@/lib/db";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { text, postId, replyToId } = CreateCommentValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.comment.create({
      data: { postId, text, replyToId, authorId: session.user.id },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not create comment, please try again later", {
      status: 500,
    });
  }
};
