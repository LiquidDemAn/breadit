import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { PostVoteRequest } from "@/lib/validators/voteValidation";
import { ApiEndpoints } from "@/configs/constants";
import { VoteType } from "@prisma/client";
import { useApiProps } from "@/components/PostVotesClient/types";
import { usePrevious } from "@mantine/hooks";
import { useCustomToast } from "@/hooks/useCustomToast";
import { toast } from "@/hooks/useToast";

export const useApi = ({
  setVotesAmount,
  setCurrentVote,
  currentVote,
}: useApiProps) => {
  const prevVote = usePrevious(currentVote);
  const { loginToast } = useCustomToast();

  const { mutate } = useMutation({
    mutationFn: async (payload: PostVoteRequest) => {
      await axios.patch(ApiEndpoints.VOTE, payload);
    },
    onMutate: (vote) => {
      const { voteType } = vote;

      if (voteType === currentVote?.voteType) {
        setCurrentVote(undefined);

        if (voteType === VoteType.UP) {
          setVotesAmount((prev) => prev - 1);
        } else if (voteType === VoteType.DOWN) {
          setVotesAmount((prev) => prev + 1);
        }
      } else {
        setCurrentVote(vote);
        if (voteType === VoteType.UP) {
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1));
        } else if (voteType === VoteType.DOWN) {
          setVotesAmount((prev) => prev - (currentVote ? 2 : 1));
        }
      }
    },
    onError: (error, { voteType }) => {
      if (voteType === VoteType.UP) {
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

  return { mutate };
};
