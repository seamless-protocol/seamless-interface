import { Icon, Typography } from "@shared";
import { TagType } from "../../../state/common/types/StateTypes";

import ilmIcon from "@assets/tags/ilm.svg";
import lendIcon from "@assets/tags/lend.svg";
import React from "react";

// eslint-disable-next-line no-unused-vars
const ColorByTypeDict: { [key in TagType]: string } = {
  LEND: "bg-smallElements-lend border-green-1000",
  ILM: "bg-smallElements-ilm border-metallicBorder",
};

// eslint-disable-next-line no-unused-vars
const IconTypeDict: { [key in TagType]: string } = {
  LEND: lendIcon,
  ILM: ilmIcon,
};

export const Tag: React.FC<{ tag?: TagType }> = ({ tag }) => {
  if (!tag) return null;
  return (
    <div
      className={`flex flex-row gap-1 items-center py-1 px-2 rounded-lg border border-solid ${ColorByTypeDict[tag]}`}
    >
      <Icon width={12} height={12} src={IconTypeDict[tag]} alt="tag" />
      <Typography type="bold">{tag}</Typography>
    </div>
  );
};
