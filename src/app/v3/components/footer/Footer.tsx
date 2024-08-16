import { FlexRow, Icon, Typography } from "@shared";

import logo from "@assets/logos/logo-seamless.svg";

import { Link } from "react-router-dom";
import { FOOTER_NAVIGATION_ICONS, navigation } from "./navigation";

export const Footer = () => {
  return (
    <div className="flex flex-col md:gap-0 gap-10 md:flex-row bg-navy-1000 justify-evenly text-text-footer py-6 px-10 md:px-0">
      <Link to="/" className="text-bold4">
        <FlexRow className="gap-3 text-start">
          <Icon width={24} src={logo} alt="logo" />
          <Typography type="bold4">Seamless</Typography>
        </FlexRow>
      </Link>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {navigation.map((x, index) => {
          return (
            <Link target="_blank" key={index} className="text-medium3" to={x.to} rel="noreferrer">
              {x.label}
            </Link>
          );
        })}
      </div>

      <FlexRow className="gap-6 items-center">
        {FOOTER_NAVIGATION_ICONS.map((item, index) => (
          <Link to={item.url} target="_blank" key={index}>
            {item.icon}
          </Link>
        ))}
      </FlexRow>
    </div>
  );
};
