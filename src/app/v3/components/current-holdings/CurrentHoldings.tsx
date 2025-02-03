import { DisplayMoney, DisplayTokenAmount, FlexCol, FlexRow, Icon, Typography, useToken } from "@shared";
import { UserProfit } from "./UserProfit";
import { Address } from "viem";
import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../statev3/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.hook";

export const CurrentHoldings: React.FC<{
  address?: Address;
}> = ({ address }) => {
  const { data: tokenData, ...tokenDataRest } = useToken(address);

  const { data: balance, ...balanceData } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: address,
    decimalsOptions: {
      singleDigitNumberDecimals: 9,
      doubleDigitNumberDecimals: 5,
    },
    options: {
      disableCompact: true,
    },
  });

  return (
    <FlexCol className="px-8 py-6 w-full rounded-xl bg-neutral-0 gap-4">
      <FlexCol className="gap-2">
        <Typography type="medium2" className="text-navy-1000">
          Current holdings
        </Typography>
        <FlexCol className="gap-1">
          <FlexRow className="gap-1">
            <Icon
              width={36}
              src={tokenData?.logo}
              isFetched={tokenDataRest.isFetched}
              isLoading={tokenDataRest.isLoading}
              alt="logo"
            />
            <DisplayTokenAmount
              {...balance?.tokenAmount}
              {...balanceData}
              typography="bold4"
              className="text-navy-1000"
            />
          </FlexRow>
          <DisplayMoney
            {...balance?.dollarAmount}
            {...balanceData}
            typography="medium2"
            className="text-primary-600"
            isApproximate
          />
        </FlexCol>
      </FlexCol>
      <UserProfit />
    </FlexCol>
  );
};
