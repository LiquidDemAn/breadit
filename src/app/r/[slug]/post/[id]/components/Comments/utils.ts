import { getAuthSession } from "@/configs/authOptions";
import { db } from "@/lib/db";
import { getVotesAmount } from "@/utils/getVotesAmount";

export const getCommentsData = async (postId: string) => {
  const session = await getAuthSession();

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
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const topLevelComments = comments
    .filter(({ replyToId }) => !replyToId)
    .map((comment) => {
      const votesAmount = getVotesAmount(comment.votes);
      const currentVote = comment.votes.find(
        (vote) => vote.userId === session?.user.id,
      );

      return { ...comment, votesAmount, currentVote };
    });

  return { topLevelComments };
};
