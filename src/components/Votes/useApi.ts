import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { ApiEndpoints } from "@/configs/constants";
import { VoteType } from "@prisma/client";
import { ComponentTypeEnum, useApiProps } from "./types";
import { usePrevious } from "@mantine/hooks";
import { useCustomToast } from "@/hooks/useCustomToast";
import { toast } from "@/hooks/useToast";
import { useUserSession } from "@/utils/useUserSession";
import { VoteRequest } from "@/lib/validators/voteValidation";

export const useApi = ({
  setVotesAmount,
  setCurrentVote,
  currentVote,
  componentType,
}: useApiProps) => {
  const prevVote = usePrevious(currentVote);
  const { loginToast } = useCustomToast();
  const session = useUserSession();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: VoteRequest) => {
      await axios.patch(
        componentType === ComponentTypeEnum.POST
          ? ApiEndpoints.POST_VOTE
          : ApiEndpoints.COMMENT_VOTE,
        payload,
      );
    },
    onMutate: (vote) => {
      const { type, id } = vote;

      if (type === currentVote?.type) {
        setCurrentVote(undefined);

        if (type === VoteType.UP) {
          setVotesAmount((prev) => prev - 1);
        } else {
          setVotesAmount((prev) => prev + 1);
        }
      } else {
        if (componentType === ComponentTypeEnum.POST) {
          setCurrentVote({ type, postId: id, userId: session?.user?.id! });
        } else {
          setCurrentVote({ type, commentId: id, userId: session?.user?.id! });
        }

        if (type === VoteType.UP) {
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1));
        } else {
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
