import React from "react";
import { FlexRow, FlexCol, DisplayText, Icon } from "../../../../shared";

export const DisplayDepositAsset: React.FC<{
  depositAsset?: {
    name?: string | undefined;
    symbol?: string | undefined;
    logo?: string | undefined;
  };
  isLoading?: boolean;
  isFetched?: boolean;
}> = ({ depositAsset, isFetched }) => {
  return (
    <FlexRow className="w-full gap-2 text-start">
      <Icon
        src={depositAsset?.logo}
        alt={depositAsset?.name || "asset"}
        isFetched={isFetched}
      />
      <FlexCol className="w-full truncate">
        <DisplayText
          typography="h4"
          text={depositAsset?.name}
          isFetched={isFetched}
        />
        <DisplayText
          typography="subheader2"
          text={depositAsset?.symbol}
          isFetched={isFetched}
        />
      </FlexCol>
    </FlexRow>
  );
};
