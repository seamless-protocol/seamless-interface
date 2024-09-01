import React from "react";
import { FlexCol, Typography, DisplayMoney, StandardTooltip, FlexRow } from "@shared";
import { useAccount } from "wagmi";
import { useFetchViewWithdrawCostInUsdAndUnderlying } from "../../../../state/loop-strategy/hooks/useFetchWithdrawCostInUsdAndUnderlying";
import { checkAuthentication } from "../../../../utils/authenticationUtils";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { AssetApy } from "../../../../v2/components/asset-data/AssetApy";

export const Summary: React.FC<{
  debouncedAmount: string;
}> = ({ debouncedAmount }) => {
  const { strategy } = useFormSettingsContext();
  const { isConnected } = useAccount();
  const { data: costData, ...restCost } = useFetchViewWithdrawCostInUsdAndUnderlying(debouncedAmount, strategy);

  return (
    <FlexCol>
      <FlexCol className="rounded-card bg-background-selected p-6 gap-4">
        <Typography type="bold3">Summary</Typography>

        <FlexRow className="text-navy-600 justify-between">
          <Typography type="bold2">Estimated Total APY</Typography>
          {strategy && <AssetApy asset={strategy} subStrategy={strategy} isStrategy className="text-navy-1000" />}
        </FlexRow>

        <FlexRow className="justify-between text-navy-600">
          <FlexRow className="gap-1 items-center">
            <Typography type="bold2">3rd party DEX fees</Typography>
            <StandardTooltip width={1}>
              <Typography type="medium2" className="text-navy-1000">
                DEX fees and price impact incurred to keep the strategy <br /> at the target multiple after your
                withdrawal. If transaction <br /> cost is high, try withdrawing smaller amounts over time.
              </Typography>
            </StandardTooltip>
          </FlexRow>
          <DisplayMoney
            {...checkAuthentication(isConnected)}
            {...restCost}
            typography="medium2"
            className="text-navy-1000"
            {...costData?.cost.dollarAmount}
          />
        </FlexRow>
      </FlexCol>
    </FlexCol>
  );
};
