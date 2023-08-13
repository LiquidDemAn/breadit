import { db } from "@/lib/db";

export const getCommentsData = async (postId: string) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
      replyToId: null,
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          votes: true,
          author: true,
        },
        orderBy: {
          votes: { _count: "desc" },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const topLevelComments = comments.filter(({ replyToId }) => !replyToId);

  return { topLevelComments };
};
