import { AuthTypeEnum } from "@/types/common";
import { ContentByAuthType } from "@/components/Auth/AuthContent/types";
import { PathsEnum } from "@/configs/constants";

export const getContentByAuthType = (
  authType: AuthTypeEnum
): ContentByAuthType => {
  switch (authType) {
    case AuthTypeEnum.SIGNIN:
      return {
        title: "Welcome back",
        subtitle: "New to Breadit?",
        linkPath: PathsEnum.SIGNUP,
        linkTitle: "Sign Up",
      };
    default:
      return {
        title: "Sign Up",
        subtitle: "Already our use?",
        linkPath: PathsEnum.SIGNIN,
        linkTitle: "Sign In",
      };
  }
};
