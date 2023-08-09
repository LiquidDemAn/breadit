import { useInfiniteQuery } from "@tanstack/react-query";
import {
  INFINITE_SCROLLING_PAGINATION_RESULTS,
  QueryKeys,
} from "@/configs/constants";
import { ExtendedPost, useApiProps } from "@/components/PostFeed/types";
import axios from "axios";

export const useApi = ({ subredditName, initialPosts }: useApiProps) => {
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

  return {
    posts,
    fetchNextPage,
    isFetchingNextPage,
  };
};
