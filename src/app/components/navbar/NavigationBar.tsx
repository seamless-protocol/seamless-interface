import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SeamlessLogo from "../../../assets/logos/logo-seamless.svg";
import { RouterConfig } from "../../router";
import {
  ConnectWalletRainbowWrapper,
  FlexCol,
  FlexRow,
  Typography,
} from "../../../shared";
import { ActionSection } from "../../../shared/components/wallet/ConnectWalletRainbowWrapper/components/sections/ActionSection";
import { AvatarSection } from "../../../shared/components/wallet/ConnectWalletRainbowWrapper/components/sections/AvatarSection";
import { NetworkSection } from "../../../shared/components/wallet/ConnectWalletRainbowWrapper/components/sections/NetworkSection";
import { useAccount } from "wagmi";

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
  },
  {
    name: "Developers",
    href: RouterConfig.Routes.developers,
  },
];

const NavBar: React.FC<{
  isMenuOpen?: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isWalletMenuOpen?: boolean;
  setIsWalletMenuOpen: (value: boolean) => void;
}> = ({ isMenuOpen, setIsMenuOpen, isWalletMenuOpen, setIsWalletMenuOpen }) => {
  const { address } = useAccount();

  const toggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsWalletMenuOpen(!isWalletMenuOpen);
  };

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

          <div className="hidden md:ml-6 md:block">
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
          </div>
        </FlexRow>

        <div className="md:block hidden">
          <ConnectWalletRainbowWrapper />
        </div>
        <div className="flex flex-row items-center md:hidden">
          <button
            onClick={toggleDropdown}
            className="box-border  border-solid  border-thin
                      rounded px-3 py-1.5  transition-all duration-250 ease-in-out 
                    bg-primary-main hover:bg-background-header"
          >
            <FlexRow className="gap-1 items-center">
              {shortenHash(address)}
              <ChevronDownIcon
                width={20}
                className={`w-5 h-5 transition-transform ease-in-out ${isWalletMenuOpen ? "rotate-180" : ""}`}
              />
            </FlexRow>
          </button>
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

function shortenHash(hash?: string, length = 4) {
  if (!hash) return "..";
  if (hash.length <= length * 2) {
    return hash; // Return the original hash if it's too short to shorten meaningfully
  }
  return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
}

export function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);

  return (
    <nav className=" border-b border-slate-600 text-white">
      <NavBar
        isMenuOpen={isMobileMenuOpen}
        setIsMenuOpen={setIsMobileMenuOpen}
        isWalletMenuOpen={isWalletMenuOpen}
        setIsWalletMenuOpen={setIsWalletMenuOpen}
      />

      <WalletContent
        isWalletMenuOpen={isWalletMenuOpen}
        setIsWalletMenuOpen={setIsWalletMenuOpen}
      />

      <MobileMenuContent isMenuOpen={isMobileMenuOpen} />
    </nav>
  );
}

const WalletContent: React.FC<{
  isWalletMenuOpen?: boolean;
  setIsWalletMenuOpen: (value: boolean) => void;
}> = ({ isWalletMenuOpen: isMenuOpen, setIsWalletMenuOpen: setIsMenuOpen }) => {
  return (
    <>
      <div
        className={`md:hidden  ${isMenuOpen ? "fixed top-12 inset-0 z-50 bg-slate-800" : "hidden"} transform 
          transition-transform duration-300 ease-in-out`}
      >
        <FlexCol className="gap-2">
          <div className="border-b">
            <AvatarSection />
          </div>
          {/* todo */}
          <NetworkSection chainName={"Base"} />
          <div className="border-t">
            <ActionSection setIsDropdownVisible={setIsMenuOpen} />
          </div>
        </FlexCol>
      </div>
    </>
  );
};

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
