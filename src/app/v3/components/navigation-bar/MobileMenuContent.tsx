import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useLifiWidgetContext, Typography, Divider, FlexRow, ConnectWalletRainbowWrapperv3 } from "../../../../shared";
import { moreMenuItems } from "./MoreButton";
import { navbarConfig } from "./navbarConfig";

export const MobileMenuContent: React.FC = () => {
  const { toggle: toggleLifiWidget } = useLifiWidgetContext();

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="my-drawer-4" className="drawer-button btn">
          <Bars3Icon width={30} height={30} />
        </label>
      </div>
      <div className="drawer-side z-50">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" />
        <div className="menu flex flex-col gap-5 p-10 bg-base-200 text-base-content min-h-full w-80">
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

          <Divider />

          <Typography>More</Typography>
          {moreMenuItems.map((item, index) => (
            <Link key={index} to={item.href} target="_blank">
              <FlexRow className="items-center gap-2">
                {item.icon && item.icon}
                <Typography type="medium3">{item.name}</Typography>
              </FlexRow>
            </Link>
          ))}

          <Divider />
          <Typography>Account</Typography>
          <ConnectWalletRainbowWrapperv3 />
        </div>
      </div>
    </div>
  );
};
