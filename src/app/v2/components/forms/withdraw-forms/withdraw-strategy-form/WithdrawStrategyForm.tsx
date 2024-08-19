import { useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { parseUnits, Address } from "viem";
import { useAccount } from "wagmi";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import {
  useNotificationContext,
  ModalHandles,
  useToken,
  FlexCol,
  FlexRow,
  MyFormProvider,
  Typography,
  WatchAssetComponentv2,
} from "../../../../../../shared";
import { WETH_ADDRESS } from "@meta";
import { useWrappedDebounce } from "../../../../../state/common/hooks/useWrappedDebounce";
import { useFetchAssetPrice } from "../../../../../state/common/queries/useFetchViewAssetPrice";
import { useWriteStrategyWithdraw } from "../../../../../state/loop-strategy/mutations/useWriteStrategyWithdraw";
import { FormButtons } from "./FormButtons";
import { Tag } from "../../../asset-data/Tag";
import { Summary } from "./Summary";
import { RouterConfig } from "../../../../../router";
import { RHFWithdrawStrategyAmountField } from "./RHFWithdrawStrategyAmountField";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchStrategyAsset } from "../../../../../state/loop-strategy/metadataQueries/useFetchStrategyAsset";
import { StrategyState } from "../../../../../state/common/types/StateTypes";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";
import { useFetchStrategyByAddress } from "../../../../../state/common/hooks/useFetchStrategyByAddress";
import { useFetchWithdrawSharesToReceive } from "../../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";

export const WithdrawStrategyForm: React.FC<{
  selectedSubStrategy?: Address;
}> = ({ selectedSubStrategy }) => {
  const { asset, isStrategy } = useFormSettingsContext();
  const { data: strategy } = useFetchStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    if (!asset && isStrategy) console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <WithdrawStrategyLocal strategy={strategy} selectedSubStrategy={selectedSubStrategy} />;
};

interface WithdrawModalFormData {
  amount: string;
}

const WithdrawStrategyLocal: React.FC<{
  strategy: StrategyState;
  selectedSubStrategy?: Address;
}> = ({ strategy, selectedSubStrategy }) => {
  const { onTransaction, hideTag, disableAssetPicker, overrideUrlSlug } = useFormSettingsContext();
  const { data: tokenData } = useFullTokenData(selectedSubStrategy);

  const {
    data: { symbol: strategySymbol },
  } = useToken(selectedSubStrategy);

  const { data: underlyingTokenAddress } = useFetchStrategyAsset(selectedSubStrategy);
  const { data: underlyingTokenData, isLoading: isTokenDecimalsLoading } = useFullTokenData(underlyingTokenAddress);

  const account = useAccount();
  const { showNotification } = useNotificationContext();
  const modalRef = useRef<ModalHandles | null>(null);
  const queryClient = useQueryClient();

  const { data: price } = useFetchAssetPrice({ asset: selectedSubStrategy });

  const { withdrawAsync } = useWriteStrategyWithdraw(selectedSubStrategy);

  // FORM //
  const methods = useForm<WithdrawModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount", "");
  const { debouncedAmount } = useWrappedDebounce(amount, price.bigIntValue, 500);

  const previewWithdrawData = useFetchWithdrawSharesToReceive(debouncedAmount, selectedSubStrategy);

  const onSubmitAsync = async (data: WithdrawModalFormData) => {
    if (!previewWithdrawData?.data.assetsToReceive?.bigIntValue) {
      showNotification({
        content: "Couldn't fetch amount(assetsToReceive) to withdraw error. Please try again later",
        status: "error",
      });
      return;
    }

    if (previewWithdrawData.isFetched && previewWithdrawData.isSuccess && !previewWithdrawData.isLoading) {
      await withdrawAsync(
        {
          shares: underlyingTokenData.decimals ? parseUnits(data.amount, underlyingTokenData.decimals) : undefined,
          from: account.address as Address,
          receiver: account.address as Address,
          minToReceive: previewWithdrawData.data.assetsToReceive.bigIntValue,
        }, {
        onSuccess: (txHash) => {
          modalRef.current?.close();
          showNotification({
            txHash,
            content: (
              <FlexCol>
                <Typography type="regular3">
                  You Withdrew {data.amount} ${strategySymbol}
                </Typography>
                {underlyingTokenAddress === WETH_ADDRESS && (
                  <FlexRow className="w-full">
                    <Link
                      to={RouterConfig.Routes.unwrapEth}
                      className="flex flex-row items-center justify-end gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography type="bold2" className="text-right">
                        To unwrap ETH, click here
                      </Typography>
                      <ArrowTopRightOnSquareIcon width={12} />
                    </Link>
                  </FlexRow>
                )}
                {underlyingTokenAddress && underlyingTokenData?.symbol && (
                  <WatchAssetComponentv2
                    address={underlyingTokenAddress}
                    logo={underlyingTokenData.logo}
                    decimals={underlyingTokenData.decimals}
                  />
                )}
                {underlyingTokenAddress === WETH_ADDRESS && (
                  <FlexRow className="w-full">
                    <Link
                      to={RouterConfig.Routes.unwrapEth}
                      className="flex flex-row items-center justify-end gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography type="bold2" className="text-right">
                        To unwrap to ETH, click here
                      </Typography>
                      <ArrowTopRightOnSquareIcon width={12} />
                    </Link>
                  </FlexRow>
                )}
              </FlexCol>
            ),
          });
          // todo: invalidate only specific queries
          queryClient.invalidateQueries();
        },
        onSettled: () => {
          reset();
          onTransaction?.();
        }
      });
    };
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexRow className="justify-between items-start">
            <FlexCol className="gap-1 min-h-10">
              <Typography type="bold4">
                {selectedSubStrategy ? "Withdraw" : "Select strategy to get started"}
              </Typography>
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>

            {selectedSubStrategy != null && !hideTag && <Tag tag="ILM" />}
          </FlexRow>
          <RHFWithdrawStrategyAmountField
            overrideUrlSlug={disableAssetPicker ? undefined : overrideUrlSlug}
            assetAddress={disableAssetPicker ? selectedSubStrategy : undefined}
            name="amount"
          />
        </FlexCol>

        <Summary debouncedAmount={debouncedAmount} strategy={strategy} />

        <FormButtons isLoading={previewWithdrawData.isLoading || isTokenDecimalsLoading} />
      </FlexCol>
    </MyFormProvider>
  );
};
