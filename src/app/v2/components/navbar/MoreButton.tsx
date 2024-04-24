import { CircleStackIcon, QuestionMarkCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { RouterConfig } from '../../../router';
import { MoreManuButton } from './MoreManuButton';

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
];

export const MoreButton = () => {
  return <MoreManuButton name="More" moreMenuItems={moreMenuItems} />
}