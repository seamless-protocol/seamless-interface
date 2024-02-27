import { FlexRow, Typography } from "@shared";
import { Link } from "react-router-dom";
import { FOOTER_NAVIGATION, FOOTER_NAVIGATION_ICONS } from "./navigation";

export const Footer = () => {
  return (
    <FlexRow
      className="md:flex-row flex-col bg-background-footer 
      text-text-primary justify-between items-center
      w-full pt-[22px] pb-10 gap-[22px] md:gap-0 md:py-5 md:px-[22px]"
    >
      <FlexRow className="gap-[10px]">
        {FOOTER_NAVIGATION.map((item, index) => (
          <Link to={item.url} target="_blank" key={index}>
            <Typography type="caption">{item.text}</Typography>
          </Link>
        ))}
      </FlexRow>
      <FlexRow className="gap-[10px]">
        {FOOTER_NAVIGATION_ICONS.map((item, index) => (
          <Link to={item.url} target="_blank" key={index}>
            {item.icon}
          </Link>
        ))}
      </FlexRow>
    </FlexRow>
  );
};
