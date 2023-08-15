import { Props } from "@/components/PostVoteServer/types";
import { getVoteData } from "@/components/PostVoteServer/utils";
import { notFound } from "next/navigation";
import Votes from "@/components/Votes";
import { ComponentTypeEnum } from "@/components/Votes/types";

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
    <Votes
      id={postId}
      componentType={ComponentTypeEnum.POST}
      initialVote={currentVote || initialVote}
      initialVotesAmount={votesAmount || initialVotesAmount}
    />
  );
};

export default PostVoteServer;
