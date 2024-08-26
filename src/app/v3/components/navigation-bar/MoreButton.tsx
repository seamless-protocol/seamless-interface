import {
  CircleStackIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChartBarSquareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import { RouterConfig } from "../../../router";
import { MoreMenuButton } from "./MoreMenuButton";

export const moreMenuItems = [
  {
    name: "Staking Farms",
    href: RouterConfig.Routes.stakingFarms,
    icon: <CircleStackIcon width={20} />,
  },
  {
    name: "FAQ",
    href: RouterConfig.Routes.faq,
    icon: <QuestionMarkCircleIcon width={20} />,
  },
  {
    name: "GitHub",
    href: RouterConfig.Routes.developers,
    icon: <BookOpenIcon width={20} />,
  },
  {
    name: "Chaos Labs Risk Dashboard",
    href: RouterConfig.Routes.chaosRiskDashboard,
    icon: <ChartBarIcon width={20} />,
  },
  {
    name: "Gauntlet Risk dashboard",
    href: RouterConfig.Routes.gauntletRiskDashboard,
    icon: <ChartBarSquareIcon width={20} />,
  },
];

export const MoreButton = () => {
  return <MoreMenuButton name="More" moreMenuItems={moreMenuItems} />;
};
