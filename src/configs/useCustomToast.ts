import { useToast } from "@/hooks/use-toast";

export const useCustomToast = () => {
  const { toast } = useToast();

  const signInErrorToast = () => {
    toast({
      title: "There was a problem.",
      description: "There was an error logging in with Google",
      variant: "destructive",
    });
  };

  return {
    signInErrorToast,
  };
};
