import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FlexRow, Icon, Typography } from "../../../shared";
import { Link } from "react-router-dom";
import ConnectWalletButton from "./connect-wallet/ConnectWalletButton";
import SeamlessLogo from "/logo-seamless.svg";

const navigation = [
  {
    name: "Integrated Liquidity Market",
    href: "https://app.seamlessprotocol.com",
    current: true,
  },
  {
    name: "Lending & Borrowing",
    href: "https://ilm.seamlessprotocol.com",
    current: false,
  },
];

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
                      <Link to={item.href} className="h-max">
                        <Typography
                          className="text-base"
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
                <Link to={item.href}>
                  <Typography
                    className="text-base text-gray-300 block rounded-md px-4 py-3 h1"
                    type="h3"
                    color="primary"
                  >
                    {item.name}
                  </Typography>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
