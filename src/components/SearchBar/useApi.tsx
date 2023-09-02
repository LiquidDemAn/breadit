import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ApiEndpoints, QueryKeys } from "@/configs/constants";
import { Subreddit, Prisma } from "@prisma/client";

export const useApi = (value: string) => {
  const {
    isFetched,
    data: queryResult,
    refetch,
  } = useQuery({
    queryFn: async () => {
      if (!value) {
        return [];
      }

      const { data } = await axios.get<
        (Subreddit & { _count: Prisma.SubredditCountOutputType })[]
      >(`${ApiEndpoints.SEARCH_COMMUNITIES}=${value}`);

      return data;
    },
    queryKey: [QueryKeys.SEARCH_QUERY],
    enabled: false,
  });

  return {
    isFetched,
    queryResult,
    refetch,
  };
};
