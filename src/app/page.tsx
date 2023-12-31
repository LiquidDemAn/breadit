import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { PathsEnum } from "@/configs/constants";
import PostFeed from "@/components/PostFeed";
import { getInitialPosts } from "@/app/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const posts = await getInitialPosts();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <PostFeed initialPosts={posts} />
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="py-3 flex items-center gap-1.5 font-semibold">
              <HomeIcon className="w-4 h-4" />
              Home
            </p>
          </div>

          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Your personal Breadit homepage. Come here to check in with your
                favorite community
              </p>
            </div>

            <Link
              className={buttonVariants({ className: "w-full mt-4 mb-6" })}
              href={PathsEnum.CREATECOMMUNITY}
            >
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
