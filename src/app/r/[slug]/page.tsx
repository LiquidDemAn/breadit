import React from "react";
import { getAuthSession } from "@/configs/authOptions";
import { getSubredditByName } from "@/app/r/[slug]/utils";
import { notFound } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import { PageProps } from "@/app/r/[slug]/types";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/configs/constants";
import PostFeed from "@/components/PostFeed";

const Page = async ({ params: { slug } }: PageProps) => {
  const session = await getAuthSession();
  const subreddit = await getSubredditByName({
    postsComments: true,
    postsAuthor: true,
    postsVotes: true,
    postsSubreddit: true,
    name: slug,
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  if (!subreddit) {
    return notFound();
  }

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      <CreatePost session={session} />
      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </>
  );
};

export default Page;
