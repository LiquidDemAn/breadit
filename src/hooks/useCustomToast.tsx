import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { PathsEnum } from "@/configs/constants";

export const useCustomToast = () => {
  const { toast } = useToast();

  const signInErrorToast = () => {
    toast({
      title: "There was a problem.",
      description: "There was an error logging in with Google",
      variant: "destructive",
    });
  };

  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required!",
      description: "You need to be logged in to do that",
      variant: "destructive",
      action: (
        <Link
          href={PathsEnum.SIGNIN}
          onClick={() => dismiss()}
          className={buttonVariants({ variant: "outline" })}
        >
          Sign In
        </Link>
      ),
    });
  };

  const subredditAlreadyExistsToast = () => {
    toast({
      title: "Subreddit already exists.",
      description: "Please choose a different subreddit name",
      variant: "destructive",
    });
  };

  const invalidSubredditNameToast = () => {
    toast({
      title: "Invalid subreddit name",
      description: "Please choose a name between 3 and 21 characters.",
      variant: "destructive",
    });
  };

  const unknownSubredditErrorToast = () => {
    toast({
      title: "There was an error",
      description: "Could not create subreddit",
      variant: "destructive",
    });
  };

  return {
    signInErrorToast,
    subredditAlreadyExistsToast,
    invalidSubredditNameToast,
    loginToast,
    unknownSubredditErrorToast,
  };
};
