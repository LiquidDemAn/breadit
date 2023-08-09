"use client";
import { FC, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { ExtendedPost, Props } from "@/components/PostFeed/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  INFINITE_SCROLLING_PAGINATION_RESULTS,
  QueryKeys,
} from "@/configs/constants";
import axios from "axios";
import { VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/types/common";
import Post from "@/components/Post/Post";

const PostFeed: FC<Props> = ({ initialPosts, subredditName }) => {
  const { data } = useSession();
  const session = data as UserSessionType;

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const {
    data: infiniteData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [QueryKeys.INFINITY_QUERY],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "");
      const { data } = await axios<ExtendedPost[]>(query);
      return data;
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    },
  );

  const posts = infiniteData?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, cur) => {
          if (cur.type === VoteType.UP) {
            return acc + 1;
          }

          if (cur.type === VoteType.DOWN) {
            return acc - 1;
          }

          return acc;
        }, 0);

        const isVoted = post.votes.filter(
          (vote) => vote.userId === session?.user.id,
        );

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
