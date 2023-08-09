"use client";
import { FC, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { Props } from "@/components/PostFeed/types";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/types/common";
import Post from "@/components/Post";
import { useApi } from "@/components/PostFeed/useApl";
import { getVotesData } from "@/components/PostFeed/utils";

const PostFeed: FC<Props> = ({ initialPosts, subredditName }) => {
  const { data } = useSession();
  const session = data as UserSessionType;

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { posts, isFetchingNextPage, fetchNextPage } = useApi({
    initialPosts,
    subredditName,
  });

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const { votesAmt, isVoted } = getVotesData(post, session);

        return (
          <li key={post.id} {...(index === posts.length - 1 && { ref: ref })}>
            <Post subredditName={post.subreddit.name} post={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostFeed;
