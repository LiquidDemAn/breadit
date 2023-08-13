import { Props } from "@/app/r/[slug]/post/[id]/types";
import { getPost } from "@/app/r/[slug]/post/[id]/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PostVoteServer from "@/components/PostVoteServer";
import PostVoteShell from "@/app/r/[slug]/post/[id]/components/PostVoteShell";
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/utils";
import EditorOutput from "@/components/EditorOutput";
import { Loader2 } from "lucide-react";
import Comments from "@/app/r/[slug]/post/[id]/components/Comments";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = async ({ params }: Props) => {
  const { id } = params;
  const { post, cachedPost } = await getPost(id);

  const getData = async () => {
    return db.post.findUnique({
      where: {
        id,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  };

  if (!post && !cachedPost) {
    return notFound();
  }

  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <Suspense fallback={<PostVoteShell />}>
          {/*@ts-expect-error server component*/}
          <PostVoteServer
            postId={post?.id || cachedPost.id}
            getData={getData}
          />
        </Suspense>

        <div className="sm: w-0 w-full flex-1 bg-white p-4 rounded-sm">
          <p className="max-h-40 mt-1 truncate text-xs text-gray-500">
            Posted by u/{post?.author.username || cachedPost.authorUsername}
            {formatTimeToNow(new Date(post?.createdAt || cachedPost.createdAt))}
          </p>
          <h1 className="text-xl font-semibold py-2 leading-6 text-gray-900">
            {post?.title ?? cachedPost.title}
          </h1>

          <EditorOutput content={post?.content || cachedPost.content} />

          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            }
          >
            {/* @ts-expect-error Server Component */}
            <Comments postId={post?.id || cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
