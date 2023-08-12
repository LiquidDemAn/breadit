import { FC, useRef } from "react";
import { Props } from "@/components/Post/types";
import { formatTimeToNow } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import EditorOutput from "@/components/EditorOutput/EditorOutput";
import { getPostLink } from "@/utils/getPostLink";
import { getSubredditLink } from "@/utils/getSubredditLink";
import Link from "next/link";
import PostVoteClient from "@/components/PostVotesClient";
import { getVotesAmount } from "@/utils/getVotesAmount";
import { useUserSession } from "@/utils/useUserSession";

const Post: FC<Props> = ({ subredditName, post }) => {
  const session = useUserSession();
  const pRef = useRef<HTMLDivElement>(null);

  const votesAmount = getVotesAmount(post);
  const subredditLink = getSubredditLink(subredditName);
  const postLink = getPostLink(subredditName, post.id);

  const commentsAmount = post.comments.length;
  const currentVote = post.votes.find(
    (vote) => vote.userId === session?.user.id,
  );

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initialVote={currentVote}
          initialVotesAmount={votesAmount}
        />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={subredditLink}
                >
                  r/{subredditName}
                </a>
                <span className="px-1">-</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.name}</span>
            <span className="inline-block ml-1">
              {formatTimeToNow(new Date(post.createdAt))}
            </span>
          </div>
          <Link href={postLink}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </Link>

          <div
            ref={pRef}
            className="relative text-sm max-h-40 w-full overflow-clip"
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6">
        <Link href={postLink} className="w-fit flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> {commentsAmount} comments
        </Link>
      </div>
    </div>
  );
};

export default Post;
