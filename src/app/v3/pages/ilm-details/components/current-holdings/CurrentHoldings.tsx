import { DisplayMoney, DisplayTokenAmount, FlexCol, FlexRow, Icon, Typography } from "@shared";
import { useFetchTokenData } from "../../../../../statev3/metadata/TokenData.fetch";
import { wstETHBooster_ADDRESS } from "../../../../../../meta";
import { useFetchFormattedAssetBalanceWithUsdValue } from "../../../../../statev3/queries/AssetBalanceWithUsdValue.hook";
import { UserProfit } from "./UserProfit";

export const CurrentHoldings = () => {
  const { data: strategyData, ...strategyDataRest } = useFetchTokenData(wstETHBooster_ADDRESS);

  const { data: strategyBalance, ...strategyBalanceRest } = useFetchFormattedAssetBalanceWithUsdValue({
    asset: wstETHBooster_ADDRESS,
  });

  return (
    <FlexCol className="px-8 py-6 w-full rounded-xl bg-neutral-0 gap-4">
      <FlexCol className="gap-2">
        <Typography type="medium2" className="text-navy-1000">
          Current holdings
        </Typography>
        <FlexCol className="gap-1">
          <FlexRow className="gap-1">
            <Icon width={36} src={strategyData?.icon} {...strategyDataRest} alt="logo" />
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
