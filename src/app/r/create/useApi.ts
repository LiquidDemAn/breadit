import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ApiEndpoints } from "@/configs/constants";
import { CreateSubredditType } from "@/lib/validators/subreddit";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";

export const useApi = () => {
  const router = useRouter();

  const {
    subredditAlreadyExistsToast,
    invalidSubredditNameToast,
    loginToast,
    unknownSubredditErrorToast,
  } = useCustomToast();

  const createSubredditQuery = useMutation({
    mutationFn: async (body: CreateSubredditType) => {
      const { data } = await axios.post<string>(ApiEndpoints.SUBREDDIT, body);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          subredditAlreadyExistsToast();
        }

        if (error.response?.status === 422) {
          invalidSubredditNameToast();
        }

        if (error.response?.status === 401) {
          loginToast();
        }
      }

      unknownSubredditErrorToast();
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });

  return {
    createSubredditQuery,
  };
};
