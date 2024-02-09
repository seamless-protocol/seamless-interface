import React from "react";
import { FlexRow, FlexCol, DisplayText, Icon } from "../../../../shared";

export const DisplayDepositAsset: React.FC<{
  depositAsset?: {
    name?: string | undefined;
    description?: string | undefined;
    logo?: string | undefined;
  };
  isLoading?: boolean;
}> = ({ depositAsset, isLoading }) => {
  return (
    <FlexRow className="gap-2 text-start">
      <Icon
        src={depositAsset?.logo}
        alt={depositAsset?.name || "asset"}
        isLoading={isLoading}
      />
      <FlexCol>
        <DisplayText
          typography="h4"
          text={depositAsset?.name}
          isLoading={isLoading}
        />
        <DisplayText
          typography="subheader2"
          text={depositAsset?.description}
          isLoading={isLoading}
        />
      </FlexCol>
    </FlexRow>
  );
};
