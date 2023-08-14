"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { Props } from "@/components/PostFeed/types";
import Post from "@/components/Post";
import { useApi } from "@/components/PostFeed/useApl";
import { useUserSession } from "@/utils/useUserSession";

const PostFeed: FC<Props> = ({ initialPosts, subredditName }) => {
  const session = useUserSession();
  const [isLastPosts, setIsLastPosts] = useState<boolean>(false);

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { posts, isFetchingNextPage, fetchNextPage } = useApi({
    initialPosts,
    subredditName,
    setIsLastPosts,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !isLastPosts && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, isFetchingNextPage, isLastPosts]);

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        return (
          <li key={post.id} {...(index === posts.length - 1 && { ref: ref })}>
            <Post
              subredditName={post.subreddit.name}
              post={post}
              session={session}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PostFeed;
