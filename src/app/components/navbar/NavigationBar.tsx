import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  BookOpenIcon,
  EllipsisHorizontalIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SeamlessLogo from "@assets/logos/logo-seamless.svg";
import { RouterConfig } from "@router";
import {
  ConnectWalletRainbowWrapper,
  ConnectWalletRainbowWrapperMobile,
  FlexRow,
  Typography,
} from "@shared";

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
    href: RouterConfig.Routes.faq,
    icon: <QuestionMarkCircleIcon width={20} />,
  },
  {
    name: "Developers",
    href: RouterConfig.Routes.developers,
    icon: <BookOpenIcon width={20} />,
  },
];

const NavBar: React.FC<{
  isMenuOpen?: boolean;
  setIsMenuOpen: (value: boolean) => void;
}> = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !(moreMenuRef.current as any).contains(event.target)
      ) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-background-header border-b border-slate-600 px-2 md:px-6 lg:px-8 flex flex-row items-center justify-between min-h-12">
      <FlexRow className="items-center justify-between w-full">
        <FlexRow className="items-center justify-start">
          <Link
            to={RouterConfig.Routes.ilm}
            className="flex items-center gap-2"
          >
            <img src={SeamlessLogo} alt="logo" className="h-6 w-6" />
            <span className="text-primary-contrast">Seamless</span>
          </Link>

          <div className="hidden md:ml-6 md:flex md:flex-row md:items-center">
            <div className="flex space-x-4">
              {navigation.map((item, index) => (
                <div
                  key={index}
                  className="group relative px-4 py-3.5 flex items-center"
                >
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
            </div>

            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center px-3 py-0.5 ml-1 rounded min-w-8 hover:bg-background-hover"
              >
                <span className="text-base text-center" color="primary">
                  <Typography type="description">More</Typography>
                </span>
                <EllipsisHorizontalIcon className="h-5 w-5 text-white ml-2" />
              </button>
              {isMoreMenuOpen && (
                <div className="absolute py-1 text-text-secondary left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {moreMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      target="_blank"
                      className="block px-4 py-3 hover:bg-action-hover"
                    >
                      <FlexRow className="items-center gap-2">
                        {item.icon}
                        <Typography type="subheader1">{item.name}</Typography>
                      </FlexRow>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </FlexRow>

        <div className="md:block hidden">
          <ConnectWalletRainbowWrapper />
        </div>
        <div className="flex flex-row items-center md:hidden">
          <ConnectWalletRainbowWrapperMobile />

          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>
            {isMenuOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </FlexRow>
    </div>
  );
};

export function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className=" border-b border-slate-600 text-white">
      <NavBar
        isMenuOpen={isMobileMenuOpen}
        setIsMenuOpen={setIsMobileMenuOpen}
      />

      <MobileMenuContent isMenuOpen={isMobileMenuOpen} />
    </nav>
  );
}

const MobileMenuContent: React.FC<{
  isMenuOpen?: boolean;
}> = ({ isMenuOpen }) => {
  return (
    <div
      className={`md:hidden ${isMenuOpen ? "fixed top-12 inset-0 z-50 bg-slate-800" : "hidden"} transform 
        transition-transform duration-300 ease-in-out`}
    >
      <div className="pb-3 px-6 mt-12">
        <Typography type="subheader2" className="pb-4 text-text-light">
          Menu
        </Typography>
        {navigation.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="block py-4 rounded-md text-white hover:bg-slate-700"
          >
            <Typography type="h2">{item.name}</Typography>
          </Link>
        ))}
        <hr className="my-4 mx-[-25px] border-slate-600" />
        <Typography type="subheader2" className="py-4 text-text-light">
          Links
        </Typography>
        {moreMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="block py-4 rounded-md text-white hover:bg-slate-700"
          >
            <Typography type="body1">{item.name}</Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};
