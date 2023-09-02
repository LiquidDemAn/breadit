import { useToast } from "@/hooks/useToast";
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

  const defaultServerErrorToast = () => {
    toast({
      title: "There was a problem",
      description: "Something went wrong, try again later...",
      variant: "destructive",
    });
  };

  const subredditSubscribeToast = (subredditName: string) => {
    toast({
      title: "Subscribed",
      description: `You are now subscribed to r/${subredditName}`,
    });
  };

  const subredditUnsubscribeToast = (subredditName: string) => {
    toast({
      title: "Unsubscribed",
      description: `You are now unsubscribed from r/${subredditName}`,
    });
  };

  const postValidationToast = (description: string) => {
    toast({
      title: "Something went wrong!",
      description,
      variant: "destructive",
    });
  };

  const creatPostErrorToast = () => {
    toast({
      title: "Something went wrong!",
      description: "Your post was not published, please try again later",
      variant: "destructive",
    });
  };

  const successCretePostToast = () => {
    toast({
      description: "Your post has been published!",
    });
  };

  const userNameAlreadyTakenToast = () => {
    toast({
      title: "Username already taken.",
      description: "Please choose a different username.",
      variant: "destructive",
    });
  };

  const unknownUsernameErrorToast = () => {
    toast({
      title: "There was an error",
      description: "Could not change username",
      variant: "destructive",
    });
  };

  const successUserNameChangeToast = () => {
    toast({
      description: "Your username has been updated.",
    });
  };

  return {
    loginToast,
    signInErrorToast,
    subredditSubscribeToast,
    defaultServerErrorToast,
    subredditUnsubscribeToast,
    invalidSubredditNameToast,
    unknownSubredditErrorToast,
    subredditAlreadyExistsToast,
    postValidationToast,
    creatPostErrorToast,
    successCretePostToast,
    userNameAlreadyTakenToast,
    unknownUsernameErrorToast,
    successUserNameChangeToast,
  };
};
