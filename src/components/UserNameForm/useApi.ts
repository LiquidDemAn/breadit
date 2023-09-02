import { useMutation } from "@tanstack/react-query";
import { UsernameValidationType } from "@/lib/validators/usernameValidation";
import axios, { AxiosError } from "axios";
import { ApiEndpoints } from "@/configs/constants";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";

export const useApi = () => {
  const router = useRouter();

  const {
    userNameAlreadyTakenToast,
    unknownUsernameErrorToast,
    successUserNameChangeToast,
  } = useCustomToast();

  return useMutation({
    mutationFn: async (payload: UsernameValidationType) => {
      const { data } = await axios.patch(ApiEndpoints.USERNAME, payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          userNameAlreadyTakenToast();
        }
      }
      unknownUsernameErrorToast();
    },
    onSuccess: () => {
      successUserNameChangeToast();
      router.refresh();
    },
  });
};
