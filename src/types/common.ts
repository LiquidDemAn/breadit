import { PathsEnum } from "@/configs/constants";

export type MenuItemType = {
  href: PathsEnum;
  label: string;
  hasSeparator?: boolean;
};
