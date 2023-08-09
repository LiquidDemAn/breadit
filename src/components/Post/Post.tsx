import { FC } from "react";
import { Props } from "@/components/Post/types";
import { PathsEnum } from "@/configs/constants";
import { formatTimeToNow } from "@/lib/utils";

const Post: FC<Props> = ({ subredditName, post }) => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        {/*  TODO Votes  */}

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={PathsEnum.SUBREDDIT + subredditName}
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
        </div>
      </div>
    </div>
  );
};

export default Post;
