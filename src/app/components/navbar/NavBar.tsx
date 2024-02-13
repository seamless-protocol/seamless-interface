import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { FlexRow, Icon, Typography } from "../../../shared";
import { Link } from "react-router-dom";
import ConnectWalletButton from "./connect-wallet/ConnectWalletButton";
import SeamlessLogo from "../../../assets/logos/logo-seamless.svg";
import { RouterConfig } from "../../router";
import { MobileMenuRow } from "./MobileMenuRow";

const navigation = [
  {
    name: "Dashboard",
    href: RouterConfig.Routes.ilm,
    current: true,
  },
  {
    name: "Lending & Borrowing",
    href: RouterConfig.Routes.lendingAndBorrowing,
    current: false,
  },
  {
    name: "Staking Farms",
    href: RouterConfig.Routes.stakingFarms,
    current: false,
  },
  {
    name: "Governance",
    href: RouterConfig.Routes.governance,
    current: false,
  },
];

const moreMenuItems = [
  {
    name: "FAQ",
    icon: <QuestionMarkCircleIcon />,
    href: RouterConfig.Routes.faq,
  },
  {
    name: "Developers",
    icon: <BookOpenIcon />,
    href: RouterConfig.Routes.developers,
  },
];

function MoreMenu() {
  return (
    <Menu as="div" className="relative ml-3 flex items-center">
      <div>
        <Menu.Button className="flex items-center px-2 py-0.5 rounded min-w-8 hover:bg-background-hover">
          <Typography
            className="text-base text-center"
            type="description"
            color="primary"
          >
            More
          </Typography>
          <EllipsisHorizontalIcon
            className="h-8 w-8 text-white "
            title="More"
          />
        </Menu.Button>
      </div>
      <Transition>
        <Menu.Items className="absolute left-0 z-10 mt-6 w-60 origin-top-right rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {moreMenuItems.map((item) => (
            <Menu.Item>
              <Link to={item.href}>
                <FlexRow className="items-center hover:bg-action-hover px-4 py-3 gap-3">
                  <div className="w-5">{item.icon}</div>
                  <Typography type="subheader1">{item.name}</Typography>
                </FlexRow>
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function NavBar() {
  return (
    <Disclosure
      as="nav"
      className="bg-background-header border-b border-slate-600"
    >
      {({ open }) => (
        <>
          <div className=" px-2 sm:px-6 lg:px-8 flex flex-row items-center justify-between min-h-12">
            <FlexRow className="items-center">
              <FlexRow className="h-full flex items-center gap-2">
                <Icon src={SeamlessLogo} alt="logo" className="h-6 w-6" />
                <Typography
                  className="text-base"
                  type="description"
                  color="primary"
                >
                  Seamless
                </Typography>
              </FlexRow>

              <div className="absolute inset-r-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <div className="group relative px-4 py-3.5">
                      <span
                        className={`ease absolute bottom-0 left-0 w-0 border-b-2 transition-all duration-200 group-hover:w-full  [border-image:linear-gradient(to_top_right,#642EF6,#ECFFC2)_1] ${item.current ? "w-full" : ""}`}
                      ></span>
                      <Link to={item.href} className="h-max flex items-center">
                        <Typography
                          className="text-base text-center"
                          type="description"
                          color="primary"
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    </div>
                  ))}

                  <MoreMenu />
                </div>
              </div>
            </FlexRow>
            <div className="hidden sm:block items-right">
              <ConnectWalletButton />
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden min-h-screen bg-slate-800">
            <div className="space-y-1 px-2 pb-3 pt-8  border-t border-slate-600">
              <Typography type="main12" color="light" className="px-4 mb-3">
                Menu
              </Typography>
              {navigation.map((item) => (
                <MobileMenuRow label={item.name} href={item.href} />
              ))}
              <div>
                <hr className="border-t border-slate-600 my-10" />
                <Typography type="main12" color="light" className="px-4 mb-3">
                  Links
                </Typography>
                {moreMenuItems.map((item) => (
                  <MobileMenuRow label={item.name} href={item.href} />
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
