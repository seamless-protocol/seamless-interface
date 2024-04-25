import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SeamlessLogo from "@assets/logos/logo-seamless.svg";
import { RouterConfig } from "@router";
import {
  ConnectWalletRainbowWrapper,
  ConnectWalletRainbowWrapperMobile,
  useLifiWidgetContext,
  FlexRow,
  Typography,
  CBSubscribeButton,
} from "@shared";
import { LegacyModeButton } from "./LegacyMoreButton";
import { MoreButton, moreMenuItems } from "./MoreButton";
import { CbSubscribeConfig } from "../../../config/cb-subscribe.config";

const navigation = [
  {
    name: "Seamless Mode",
    href: "/",
    current: true,
  },
  {
    component: <LegacyModeButton />,
  },
  {
    name: "Bridge to Base",
    href: "",
    isLifi: true,
    current: false,
  },
  {
    name: "Governance",
    href: RouterConfig.Routes.governance,
    current: false,
  },
];

const NavBar: React.FC<{
  isMenuOpen?: boolean;
  setIsMenuOpen: (value: boolean) => void;
}> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { toggle: toggleLifiWidget } = useLifiWidgetContext();

  return (
    <div className="bg-background-header border-b border-slate-600 px-2 md:px-6 lg:px-8 flex flex-row items-center justify-between min-h-12">
      <FlexRow className="items-center justify-between w-full">
        <FlexRow className="items-center justify-start">
          <Link to="/" className="flex items-center gap-2">
            <img src={SeamlessLogo} alt="logo" className="h-6 w-6" />
            <span className="text-primary-contrast">Seamless</span>
          </Link>

          <div className="hidden md:ml-6 md:flex md:flex-row md:items-center">
            <div className="flex space-x-4">
              {navigation.map((item, index) => (
                <div key={index} className="group relative px-4 py-3.5 flex items-center">
                  <span
                    className={`ease absolute bottom-0 left-0 w-0 border-b-2 transition-all duration-200 group-hover:w-full  [border-image:linear-gradient(to_top_right,#642EF6,#ECFFC2)_1] ${item.current ? "w-full" : ""}`}
                  />
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {item.isLifi ? (
                    <button onClick={() => toggleLifiWidget()}>
                      <Typography className="text-base text-center" type="description" color="primary">
                        {item.name}
                      </Typography>
                    </button>
                  ) : item.component ? (
                    item.component
                  ) : (
                    <Link to={item.href || ""} className="h-max flex items-center">
                      <Typography className="text-base text-center" type="description" color="primary">
                        {item.name}
                      </Typography>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <MoreButton />
          </div>
        </FlexRow>
        <FlexRow className="justify-end gap-1 md:gap-4 items-center px-2">
          <span className="">
            {typeof window !== "undefined" && <CBSubscribeButton config={{ ...CbSubscribeConfig }} />}
          </span>
          <div className="md:block hidden">
            <ConnectWalletRainbowWrapper />
          </div>
          <div className="flex flex-row items-center md:hidden">
            <ConnectWalletRainbowWrapperMobile />

            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </FlexRow>
      </FlexRow>
    </div>
  );
};

export function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className=" border-b border-slate-600 text-white text-regular3">
      <NavBar isMenuOpen={isMobileMenuOpen} setIsMenuOpen={setIsMobileMenuOpen} />

      <MobileMenuContent isMenuOpen={isMobileMenuOpen} />
    </nav>
  );
}

const MobileMenuContent: React.FC<{
  isMenuOpen?: boolean;
}> = ({ isMenuOpen }) => {
  return (
    <div
      className={`md:hidden ${isMenuOpen ? "fixed top-16 inset-0 z-50 bg-slate-800" : "hidden"} transform 
        transition-transform duration-300 ease-in-out`}
    >
      <div className="pb-3 px-6 mt-12">
        <Typography type="subheader2" className="pb-4 text-text-light">
          Menu
        </Typography>
        {navigation.map((item, index) => (
          <Link key={index} to={item.href || ""} className="block py-4 rounded-md text-white hover:bg-slate-700">
            <Typography type="h2">{item.name}</Typography>
          </Link>
        ))}
        <hr className="my-4 mx-[-25px] border-slate-600" />
        <Typography type="subheader2" className="py-4 text-text-light">
          Links
        </Typography>
        {moreMenuItems.map((item, index) => (
          <Link key={index} to={item.href} className="block py-4 rounded-md text-white hover:bg-slate-700">
            <Typography type="body1">{item.name}</Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};
