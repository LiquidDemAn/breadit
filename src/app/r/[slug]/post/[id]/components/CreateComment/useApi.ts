import { useMutation } from "@tanstack/react-query";
import { CreateCommentRequest } from "@/lib/validators/commentValidation";
import axios, { AxiosError } from "axios";
import { ApiEndpoints } from "@/configs/constants";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";

export const useApi = (setValue: (text: string) => void) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (payload: CreateCommentRequest) => {
      const { data } = await axios.post(ApiEndpoints.CREATE_COMMENT, payload);
      setValue("");
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status === 401) {
        loginToast();
      }
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return {
    createCommentHandle: mutate,
    isCreateCommentLoading: isLoading,
    isCreateCommentSuccess: isSuccess,
  };
};
