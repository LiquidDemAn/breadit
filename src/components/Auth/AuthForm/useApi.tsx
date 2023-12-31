import { signIn } from "next-auth/react";
import { UseApiProps } from "@/components/Auth/AuthForm/types";
import { useCustomToast } from "@/hooks/useCustomToast";

export const useApi = ({ setIsLoading }: UseApiProps) => {
  const { signInErrorToast } = useCustomToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      signInErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginWithGoogle,
  };
};
