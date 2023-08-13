import { GetVoteDataProps } from "@/components/PostVoteServer/types";
import { getVotesAmount } from "@/utils/getVotesAmount";
import { findVoteByUserId } from "@/utils/findVoteByUserId";
import { getAuthSession } from "@/configs/authOptions";

export const getVoteData = async ({ getData }: GetVoteDataProps) => {
  const session = await getAuthSession();

  if (getData) {
    const post = await getData();

    const votesAmount = getVotesAmount(post?.votes || []);
    const currentVote = findVoteByUserId(session, post?.votes);

    return { post, currentVote, votesAmount };
  }

  return { post: null, currentVote: null, votesAmount: 0 };
};
