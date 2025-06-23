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
} from "@shared";
import { WETH_ADDRESS } from "@meta";
import { RouterConfig } from "../../../../router";
import { useWrappedDebounce } from "../../../../data/common/hooks/useWrappedDebounce";
import { useFullTokenData } from "../../../../data/common/meta-data-queries/useFullTokenData";
import { useFetchAssetPrice } from "../../../../data/common/queries/useFetchViewAssetPrice";
import { useFetchWithdrawSharesToReceive } from "../../../../data/ilmv1-deprecated/queries/useFetchWithdrawSharesToReceive";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { FormButtons } from "./FormButtons";
import { RHFWithdrawStrategyAmountField } from "./RHFWithdrawStrategyAmountField";
import { Summary } from "./Summary";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import {
  FullStrategyData,
  useFetchFullStrategyData,
} from "../../../../data/ilmv1-deprecated/metadata/FullStrategyData.all";
import { useWriteStrategyWithdraw } from "../../../../data/ilmv1-deprecated/mutations/useWriteStrategyWithdraw";

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

  const { withdrawAsync, isPending } = useWriteStrategyWithdraw(strategy.address);

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

  const onSubmitAsync = async (data: WithdrawModalFormData) => {
    await withdrawAsync(
      {
        shares: underlyingTokenData.decimals ? parseUnits(data.amount, underlyingTokenData.decimals) : undefined,
        from: account.address as Address,
        receiver: account.address as Address,
        previewWithdrawData,
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
              </FlexCol>
            ),
          });
          // todo: invalidate only specific queries, after query key refactor
          queryClient.invalidateQueries();
        },
        onSettled: () => {
          reset();
          onTransaction?.();
        },
      }
    );
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
          isLoading={previewWithdrawData.isLoading || isTokenDecimalsLoading || isPending}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
