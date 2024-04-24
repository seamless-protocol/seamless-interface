import { RouterConfig } from "../../../router";
import { MoreManuButton } from "./MoreManuButton";

const moreMenuItems = [
  {
    name: "Supply & Borrow Dashboard",
    href: RouterConfig.Routes.lendingAndBorrowing,
  },
];

export const LegacyModeButton = () => {
  return <MoreManuButton name="Legacy Mode" moreMenuItems={moreMenuItems} />
}
