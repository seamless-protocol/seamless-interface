import { DisplayMoney, DisplayTokenAmount, FlexCol, Typography } from "@shared";
import { Address } from "viem";
import { useFetchTotalAssets } from "../../hooks/TotalAssetsHistorical.hook";

export const Heading: React.FC<{ showPriceInUsd?: boolean; address: Address }> = ({ showPriceInUsd, address }) => {
  const { data, ...rest } = useFetchTotalAssets(address);

  const { totalAssets, totalAssetsUsd } = data || {};

  return (
    <FlexCol className="gap-2">
      <Typography type="bold4">Total supply</Typography>
      {showPriceInUsd ? (
        <DisplayMoney
          typography="bold7"
          {...totalAssetsUsd}
          isLoading={rest.isLoading}
          errorMessage={rest.error?.message}
        />
      ) : (
        <DisplayTokenAmount
          typography="bold7"
          {...totalAssets}
          isLoading={rest.isLoading}
          errorMessage={rest.error?.message}
        />
      )}
    </FlexCol>
  );
};
