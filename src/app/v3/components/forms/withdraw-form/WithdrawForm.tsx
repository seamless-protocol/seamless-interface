import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
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
} from "@shared";
import { WETH_ADDRESS } from "@meta";
import { RouterConfig } from "../../../../router";
import { useWrappedDebounce } from "../../../../state/common/hooks/useWrappedDebounce";
import { useFullTokenData } from "../../../../state/common/meta-data-queries/useFullTokenData";
import { useFetchAssetPrice } from "../../../../state/common/queries/useFetchViewAssetPrice";
import { useFetchWithdrawSharesToReceive } from "../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";
import { useWriteStrategyWithdraw } from "../../../../state/loop-strategy/mutations/useWriteStrategyWithdraw";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { FormButtons } from "./FormButtons";
import { RHFWithdrawStrategyAmountField } from "./RHFWithdrawStrategyAmountField";
import { Summary } from "./Summary";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import { FullStrategyData, useFetchFullStrategyData } from "../../../../statev3/metadata/FullStrategyData.all";

export const WithdrawForm: React.FC = () => {
  const { strategy } = useFormSettingsContext();
  const { data: strategyData } = useFetchFullStrategyData(strategy);

  if (!strategyData) {
    // eslint-disable-next-line no-console
    console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <WithdrawStrategyLocal strategy={strategyData} />;
};

interface WithdrawModalFormData {
  amount: string;
  receiveAmount: string;
}

const WithdrawStrategyLocal: React.FC<{
  strategy: FullStrategyData;
}> = ({ strategy }) => {
  const { onTransaction } = useFormSettingsContext();

  const {
    data: { symbol: strategySymbol },
  } = useToken(strategy.address);

  const underlyingTokenAddress = strategy.underlying;
  const { data: underlyingTokenData, isLoading: isTokenDecimalsLoading } = useFullTokenData(underlyingTokenAddress);

  const account = useAccount();
  const { showNotification } = useNotificationContext();
  const modalRef = useRef<ModalHandles | null>(null);
  const queryClient = useQueryClient();

  const { data: price } = useFetchAssetPrice({ asset: strategy.address });

  const { withdrawAsync } = useWriteStrategyWithdraw(strategy.address);

  // FORM //
  const methods = useForm<WithdrawModalFormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount", "");
  const { debouncedAmount } = useWrappedDebounce(amount, price.bigIntValue, 500);

  const previewWithdrawData = useFetchWithdrawSharesToReceive(debouncedAmount, strategy.address);

  useEffect(() => {
    if (previewWithdrawData.isError) {
      showNotification({
        status: "error",
        content: (
          <Typography type="body1">
            {(previewWithdrawData.error as any)?.message} <br /> please try later! 😓
          </Typography>
        ),
      });
    }
  }, [previewWithdrawData.isError]);

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
        },
        {
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
                      icon={underlyingTokenData.logo}
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
          },
        }
      );
    }
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-3">
          <Typography type="medium3">Withdraw</Typography>
          <RHFWithdrawStrategyAmountField strategy={strategy.address} name="amount" />
        </FlexCol>

        <FlexCol className="gap-3">
          <Typography type="medium3">Receive</Typography>
          <RHFReceiveAmountField debouncedAmount={debouncedAmount} name="receiveAmount" />
        </FlexCol>

        <Summary debouncedAmount={debouncedAmount} />

        <FormButtons
          isDisabled={!previewWithdrawData.isSuccess}
          isLoading={previewWithdrawData.isLoading || isTokenDecimalsLoading}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
