import { RouterConfig } from "../../../router";
import { MoreMenuButton } from "./MoreManuButton";

const moreMenuItems = [
  {
    name: "Supply & Borrow Dashboard",
    href: RouterConfig.Routes.lendingAndBorrowing,
    noTargetBlank: true,
  },
];

export const LegacyModeButton = () => {
  return <MoreMenuButton name="Legacy Mode" moreMenuItems={moreMenuItems} />;
};
