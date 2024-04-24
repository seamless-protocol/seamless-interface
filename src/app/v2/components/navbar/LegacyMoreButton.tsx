import { RouterConfig } from "../../../router";
import { MoreMenuButton } from "./MoreManuButton";

const moreMenuItems = [
  {
    name: "Supply & Borrow Dashboard",
    href: RouterConfig.Routes.lendingAndBorrowing,
  },
];

export const LegacyModeButton = () => {
  return <MoreMenuButton name="Legacy Mode" moreMenuItems={moreMenuItems} />
}
