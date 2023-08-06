import { PropsWithChildren } from "react";
import { LayoutProps } from "@/app/r/[slug]/types";
import { getAuthSession } from "@/configs/authOptions";
import {
  getSubredditByName,
  getSubredditMembers,
  getSubscription,
} from "@/app/r/[slug]/utils";
import { notFound } from "next/navigation";
import { getDateString } from "@/utils/getDateString";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

const Layout = async ({
  children,
  params: { slug },
}: PropsWithChildren<LayoutProps>) => {
  const session = await getAuthSession();

  const subreddit = await getSubredditByName({
    name: slug,
    postsAuthor: true,
    postsVotes: true,
  });

  const subredditMembers = await getSubredditMembers(slug);

  const subscription = await getSubscription({
    session,
    subredditName: slug,
  });
  const isSubscribed = !!subscription;

  if (!subreddit) {
    return notFound();
  }
  const subredditCreatedDate = getDateString(subreddit.createdAt);

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        {/*  TODO: Button to take us back  */}
        <div className="grid gird-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About r/{slug}</p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={subreddit.createdAt.toDateString()}>
                    {subredditCreatedDate}
                  </time>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <p className="text-gray-900">{subredditMembers}</p>
                </dd>
              </div>

              {subreddit.creatorId === session?.user.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500">You created this community</p>
                </div>
              ) : null}

              {subreddit.creatorId !== session?.user.id ? (
                <SubscribeLeaveToggle
                  subredditId={subreddit.id}
                  subredditName={subreddit.name}
                  isSubscribed={isSubscribed}
                />
              ) : null}

              <Link
                href={`r/${slug}/submit`}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full mb-6",
                })}
              >
                Creat Post
              </Link>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
