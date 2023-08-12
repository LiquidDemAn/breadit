import { Props } from "@/components/PostVoteServer/types";
import { getVoteData } from "@/components/PostVoteServer/utils";
import { notFound } from "next/navigation";
import PostVoteClient from "@/components/PostVotesClient";

const PostVoteServer = async ({
  postId,
  initialVotesAmount = 0,
  initialVote,
  getData,
}: Props) => {
  const { currentVote, votesAmount, post } = await getVoteData({ getData });

  if (!post) {
    return notFound();
  }

  return (
    <PostVoteClient
      postId={postId}
      initialVotesAmount={votesAmount || initialVotesAmount}
      initialVote={currentVote || initialVote}
    />
  );
};

export default PostVoteServer;
