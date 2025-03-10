import { DisplayMoney, DisplayTokenAmount, FlexCol, Typography } from "@shared";
import { Address } from "viem";
import { useFetchTotalAssets } from "@data";

export const Heading: React.FC<{ showPriceInUsd?: boolean; address: Address }> = ({ showPriceInUsd, address }) => {
  const { data, ...rest } = useFetchTotalAssets(address);

  const { totalAssets, totalAssetsUsd } = data || {};

  return (
    <FlexCol className="gap-2">
      <Typography type="bold2">Total supply</Typography>
      {showPriceInUsd ? (
        <DisplayMoney
          typography="bold5"
          {...totalAssetsUsd}
          isLoading={rest.isLoading}
          errorMessage={rest.error?.message}
        />
      ) : (
        <DisplayTokenAmount
          typography="bold5"
          {...totalAssets}
          isLoading={rest.isLoading}
          errorMessage={rest.error?.message}
        />
      )}
    </FlexCol>
  );
};
