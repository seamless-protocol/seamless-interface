import { DisplayMoney, DisplayTokenAmount, FlexCol, FlexRow, Icon, Typography, useToken } from "@shared";
import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../statev3/queries/AssetBalanceWithUsdValue.hook";
import { UserProfit } from "./UserProfit";
import { useParams } from "react-router-dom";
import { Address } from "viem";

export const CurrentHoldings = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  const { data: strategyData, ...strategyDataRest } = useToken(strategy);

  const { data: strategyBalance, ...strategyBalanceRest } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: strategy,
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
              src={strategyData?.logo}
              isFetched={strategyDataRest.isFetched}
              isLoading={strategyDataRest.isLoading}
              alt="logo"
            />
            <DisplayTokenAmount
              {...strategyBalance?.tokenAmount}
              {...strategyBalanceRest}
              typography="bold4"
              className="text-navy-1000"
            />
          </FlexRow>
          <DisplayMoney
            {...strategyBalance?.dollarAmount}
            {...strategyBalanceRest}
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
