import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ApiEndpoints } from "@/configs/constants";
import { SubscribeSubredditType } from "@/lib/validators/subredditValidation";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Subscription } from ".prisma/client";
import { Props } from "@/components/SubscribeLeaveToggle/types";

export const useApi = ({ subredditName, subredditId, isSubscribed }: Props) => {
  const router = useRouter();

  const {
    loginToast,
    defaultServerErrorToast,
    subredditSubscribeToast,
    subredditUnsubscribeToast,
  } = useCustomToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeSubredditType = {
        subredditId,
      };
      const { data } = await axios.post<Subscription>(
        isSubscribed ? ApiEndpoints.UNSUBSCRIBE : ApiEndpoints.SUBSCRIBE,
        payload,
      );
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          loginToast();
        }
      }
      defaultServerErrorToast();
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      if (isSubscribed) {
        subredditUnsubscribeToast(subredditName);
      } else {
        subredditSubscribeToast(subredditName);
      }
    },
  });

  return { mutate, isLoading };
};
