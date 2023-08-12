import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { PostVoteRequest } from "@/lib/validators/voteValidation";
import { ApiEndpoints } from "@/configs/constants";
import { VoteType } from "@prisma/client";
import { useApiProps } from "@/components/PostVotesClient/types";
import { usePrevious } from "@mantine/hooks";
import { useCustomToast } from "@/hooks/useCustomToast";
import { toast } from "@/hooks/useToast";
import { useUserSession } from "@/utils/useUserSession";

export const useApi = ({
  setVotesAmount,
  setCurrentVote,
  currentVote,
}: useApiProps) => {
  const prevVote = usePrevious(currentVote);
  const { loginToast } = useCustomToast();
  const session = useUserSession();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: PostVoteRequest) => {
      await axios.patch(ApiEndpoints.VOTE, payload);
    },
    onMutate: (vote) => {
      const { type } = vote;

      if (type === currentVote?.type) {
        setCurrentVote(undefined);

        if (type === VoteType.UP) {
          setVotesAmount((prev) => prev - 1);
        }
        if (type === VoteType.DOWN) {
          setVotesAmount((prev) => prev + 1);
        }
      } else {
        setCurrentVote({ ...vote, userId: session?.user?.id! });

        if (type === VoteType.UP) {
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1));
        }
        if (type === VoteType.DOWN) {
          setVotesAmount((prev) => prev - (currentVote ? 2 : 1));
        }
      }
    },
    onError: (error, { type }) => {
      if (type === VoteType.UP) {
        setVotesAmount((prev) => prev - 1);
      } else {
        setVotesAmount((prev) => prev + 1);
      }

      setCurrentVote(prevVote);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Something went wrong",
        description: "Your vote was not registered, please try again",
        variant: "destructive",
      });
    },
  });

  return { mutate, isLoading };
};
