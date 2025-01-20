import { Link } from "react-router-dom";
import { useLifiWidgetContext, Typography, FlexRow, FlexCol, ConnectWalletRainbowWrapperv3 } from "@shared";
import { MoreButton } from "./MoreButton";
import { BlueCoinbaseConnectWalletButton } from "./BlueCoinbaseConnectWalletButton";

import seamlessLogo from "@assets/logos/logo-seamless.svg";
import { MobileMenuContent } from "./MobileMenuContent";
import { navbarConfig } from "./navbarConfig";

export const NavigationBar = () => {
  const { toggle: toggleLifiWidget } = useLifiWidgetContext();

  return (
    <nav className="text-regular3">
      <div className="flex justify-center">
        <FlexCol className="w-full md:max-w-page-content">
          <div className="bg-transparent flex flex-row items-center justify-between min-h-28 md:px-0 px-5">
            <FlexRow className="items-center">
              <img src={seamlessLogo} alt="logo" className="h-8 w-8 mr-8" />

              <FlexRow className="items-center gap-8">
                <Link to="/" data-cy="home">
                  <Typography type="bold3" className="text-text-blue">
                    Seamless
                  </Typography>
                </Link>

                <div className="hidden md:flex md:flex-row md:items-center">
                  <div className="flex items-center gap-8">
                    {navbarConfig.map((item, index) => (
                      <div key={index}>
                        {item.isLifi ? (
                          <button onClick={() => toggleLifiWidget()}>
                            <Typography className="text-base text-center" type="medium3">
                              {item.name}
                            </Typography>
                          </button>
                        ) : (
                          <Link to={item.href || ""} className="h-max flex items-center">
                            <Typography className="text-base text-center" type="medium3">
                              {item.name}
                            </Typography>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="pl-4">
                    <MoreButton />
                  </div>
                </div>
              </FlexRow>
            </FlexRow>

            <FlexRow className="justify-end gap-1 md:gap-4 items-center px-2">
              <div className="md:block hidden">
                <FlexRow className="items-center gap-2">
                  <BlueCoinbaseConnectWalletButton />
                  <ConnectWalletRainbowWrapperv3 />
                </FlexRow>
              </div>
              <div className="flex flex-row items-center md:hidden">
                <MobileMenuContent />
              </div>
            </FlexRow>
          </div>
        </FlexCol>
      </div>
    </nav>
  );
};
