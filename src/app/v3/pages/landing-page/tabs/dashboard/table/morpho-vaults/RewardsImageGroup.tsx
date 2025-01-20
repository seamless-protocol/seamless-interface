import React from "react";
import { ImageGroup } from "@shared";

export const RewardsImageGroup: React.FC<{
  icons: (string | undefined)[];
}> = ({ icons }) => {
  return <ImageGroup imageStyle="w-4" spacing="-space-x-3" images={icons} />;
};
