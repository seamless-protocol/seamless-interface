import { useReadAaveOracleGetAssetPrice } from "@generated";
import {
  FlexCol,
  AuthGuardv2,
  Buttonv2,
  Typography,
  useERC20Approve,
  useNotificationContext,
  useToken,
  WatchAssetComponentv2,
} from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useWrappedDebounce } from "src/app/state/common/hooks/useWrappedDebounce";
import { useFetchViewPreviewDeposit } from "src/app/state/loop-strategy/hooks/useFetchViewPreviewDeposit";
import { useMutateDepositStrategy } from "src/app/state/loop-strategy/mutations/useMutateDepositStrategy";
import { DepositModalFormData } from "src/app/v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import { parseUnits, etherUnits } from "viem";
import { earnInputConfig } from "../config/SlugConfig";
import { StrategyConfig } from "src/app/state/loop-strategy/config/StrategyConfig";

export const AddToStrategyButtons: React.FC<{
  strategy: StrategyConfig;
}> = ({ strategy }) => {
  const { showNotification } = useNotificationContext();

  const {
    data: { symbol: strategySymbol },
  } = useToken(strategy.address);

  const { watch, reset } = useFormContext();
  const amount = watch(earnInputConfig.name);

  const { isApproved, isApproving, approveAsync } = useERC20Approve(
    strategy.underlyingAsset.address,
    strategy.address,
    parseUnits(amount || "0", etherUnits.wei)
  );

  const { depositAsync, isDepositPending } = useMutateDepositStrategy(strategy.id);

  const { data: assetPrice } = useReadAaveOracleGetAssetPrice({
    args: [strategy?.underlyingAsset.address || ""],
  });
  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice, 500);
  const { data: previewDepositData } = useFetchViewPreviewDeposit(strategy.id, debouncedAmount);

  const onSubmitAsync = async (data: DepositModalFormData) => {
    if (previewDepositData) {
      await depositAsync(
        {
          amount: data.amount,
          sharesToReceive: previewDepositData.sharesToReceive.tokenAmount.bigIntValue || 0n,
        },
        {
          onSuccess: (txHash) => {
            showNotification({
              txHash,
              content: (
                <FlexCol className="w-full items-center text-center justify-center">
                  <Typography>
                    You Supplied {data.amount} {strategy?.underlyingAsset.symbol}
                  </Typography>
                  {strategy && <WatchAssetComponentv2 {...strategy} symbol={strategySymbol} />}
                </FlexCol>
              ),
            });
          },
          onSettled: () => {
            reset();
          },
        }
      );
    }
  };

  return (
    <FlexCol className="gap-2">
      <AuthGuardv2 message="">
        <Buttonv2 className="text-bold3" disabled={isApproved} loading={isApproving} onClick={approveAsync}>
          Approve
        </Buttonv2>
      </AuthGuardv2>
      <Buttonv2
        className="text-bold3"
        type="submit"
        disabled={!isApproved}
        loading={isDepositPending}
        onClick={() =>
          onSubmitAsync({
            amount,
          })
        }
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
