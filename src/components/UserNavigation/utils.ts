import { MenuItemType } from "@/types/common";
import { PathsEnum } from "@/configs/constants";

export const menuItems: MenuItemType[] = [
  { href: PathsEnum.HOME, label: "Feed" },
  { href: PathsEnum.CREATECOMMUNITY, label: "Create community" },
  { href: PathsEnum.SETTINGS, label: "Settings", hasSeparator: true },
];
