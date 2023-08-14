import { NextRequest } from "next/server";
import { getAuthSession } from "@/configs/authOptions";
import { db } from "@/lib/db";
import { z } from "zod";
import { CommentVoteValidator } from "@/lib/validators/commentValidation";

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { type, commentId } = CommentVoteValidator.parse(body);
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session?.user.id;

    const existingVote = await db.commentVote.findFirst({
      where: { userId, commentId },
    });

    const comment = await db.comment.findUnique({
      where: { id: commentId },
      include: {
        author: true,
        votes: true,
      },
    });

    if (!comment) {
      return new Response("Comment not found", { status: 404 });
    }

    if (existingVote) {
      if (existingVote.type === type) {
        await db.commentVote.delete({
          where: { userId_commentId: { commentId, userId } },
        });

        return new Response("OK");
      }

      await db.commentVote.update({
        where: {
          userId_commentId: { commentId, userId },
        },
        data: { type },
      });

      return new Response("OK");
    }

    if (!existingVote) {
      await db.commentVote.create({
        data: {
          commentId,
          userId,
          type,
        },
      });
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
