import { QuestionMarkCircleIcon, BookOpenIcon } from "@heroicons/react/24/outline";

import { RouterConfig } from "@router";
import { MoreMenuButton } from "./MoreMenuButton";

export const moreMenuItems = [
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
];

export const MoreButton = () => {
  return <MoreMenuButton name="More" moreMenuItems={moreMenuItems} />;
};
