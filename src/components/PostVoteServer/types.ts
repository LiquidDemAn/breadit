import { Post, User, Vote } from "@prisma/client";

export type Props = {
  postId: string;
  initialVotesAmount?: number;
  initialVote?: Vote;
  getData?: () => Promise<(Post & { votes: Vote[]; author: User }) | null>;
};

export type GetVoteDataProps = Pick<Props, "getData">;
