import { AuthTypeEnum } from "@/types/common";
import { PathsEnum } from "@/configs/constants";

export type Props = {
  authType: AuthTypeEnum;
};

export type ContentByAuthType = {
  title: string;
  subtitle: string;
  linkPath: PathsEnum;
  linkTitle: string;
};
