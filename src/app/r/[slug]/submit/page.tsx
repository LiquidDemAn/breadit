import { PageProps } from "@/app/r/[slug]/types";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Editor from "@/components/Editor";

// @ts-ignore
const Page = async ({ params }: PageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!subreddit) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 gap-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 text-base font-semibold leading-6 text-gray-900">
            Crete Post
          </h3>
          <p className="truncate text-sm text-gray-500">in r/{params.slug}</p>
        </div>
      </div>

      <Editor subredditId={subreddit.id} />
    </div>
  );
};

// @ts-ignore
export default Page;
