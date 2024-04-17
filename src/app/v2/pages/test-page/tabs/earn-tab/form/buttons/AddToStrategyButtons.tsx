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
import { parseUnits, etherUnits, Address } from "viem";
import { earnInputConfig } from "../../config/SlugConfig";
import { useWrappedDebounce } from "../../../../../../../state/common/hooks/useWrappedDebounce";
import { useFetchViewPreviewDeposit } from "../../../../../../../state/loop-strategy/hooks/useFetchViewPreviewDeposit";
import { useMutateDepositStrategy } from "../../../../../../../state/loop-strategy/mutations/useMutateDepositStrategy";
import { DepositModalFormData } from "../../../../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import { findILMStrategyByAddress, StrategyConfig } from "../../../../../../../state/loop-strategy/config/StrategyConfig";

export const AddToStrategyButtonsWrapper: React.FC<{
  asset: Address;
}> = ({ asset }) => {
  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <AddToStrategyButtons strategy={strategy} />;
};

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

  if (!amount) {
    return (<Buttonv2 className="text-bold3" disabled>
      Enter amount
    </Buttonv2>);
  }

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
