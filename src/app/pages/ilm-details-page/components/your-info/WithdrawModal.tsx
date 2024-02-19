import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import {
  Button,
  ButtonProps,
  DisplayMoney,
  DisplayTokenAmount,
  FlexCol,
  FlexRow,
  Modal,
  ModalHandles,
  MyFormProvider,
  Typography,
  useNotificationContext,
} from "../../../../../shared";
import { useFetchShareValue } from "../../../../state/common/hooks/useFetchShareValue";
import { useWrappedDebounce } from "../../../../state/common/hooks/useWrappedDebounce";
import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewPreviewWithdraw } from "../../../../state/loop-strategy/hooks/useFetchViewPreviewWithdraw";
import { useWriteStrategyWithdraw } from "../../../../state/loop-strategy/hooks/useWriteStrategyWithdraw";
import AmountInputWrapper from "./amount-input/AmountInputWrapper";
import { useQueryClient } from "@tanstack/react-query";

export interface WithdrawModalFormData {
  amount: string;
}

interface WithdrawModalProps extends Omit<ButtonProps, "id"> {
  id: number;
}

export const WithdrawModal = ({ id, ...buttonProps }: WithdrawModalProps) => {
  const strategyConfig = ilmStrategies[id];
  const account = useAccount();
  const { showNotification } = useNotificationContext();
  const modalRef = useRef<ModalHandles | null>(null);
  const queryClient = useQueryClient();

  const { shareValueInUsd } = useFetchShareValue(strategyConfig);
  const {
    isPending: isWithdrawPending,
    isSuccess: isWithdrawSuccessful,
    withdrawAsync,
  } = useWriteStrategyWithdraw(id);

  // FORM //
  const methods = useForm<WithdrawModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount");
  const { debouncedAmount, debouncedAmountInUsd } = useWrappedDebounce(
    amount,
    shareValueInUsd,
    500
  );

  const { data: previewWithdrawData, isLoading } = useFetchViewPreviewWithdraw(
    id,
    debouncedAmount
  );

  const onSubmitAsync = async (data: WithdrawModalFormData) => {
    if (previewWithdrawData) {
      try {
        const txHash = await withdrawAsync(
          parseUnits(data.amount, 18),
          account.address as Address,
          account.address as Address,
          previewWithdrawData?.minReceivingAmount
        );
        modalRef.current?.close();
        showNotification({
          txHash,
          content: `You Withdrew ${data.amount}  ${ilmStrategies[id].symbol}`,
        });
        queryClient.invalidateQueries();
      } catch (e) {
        modalRef.current?.close();
        showNotification({
          status: "error",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          content: (e as any)?.shortMessage,
        });
      }
    }
  };

  useEffect(() => {
    if (isWithdrawSuccessful) {
      reset();
    }
  }, [isWithdrawSuccessful, reset]);

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <Modal
        ref={modalRef}
        header={`Withdraw ${strategyConfig.underlyingAsset.symbol}`}
        buttonText="Withdraw"
        onClose={reset}
        buttonProps={{ ...buttonProps }}
      >
        <div className="flex flex-col gap-4">
          <FlexCol>
            <Typography type="description">Amount</Typography>
            <AmountInputWrapper
              assetAddress={strategyConfig.address}
              assetSymbol={strategyConfig.symbol}
              assetLogo={strategyConfig.logo}
              debouncedAmountInUsd={debouncedAmountInUsd}
              isDepositSuccessful={isWithdrawSuccessful}
            />
          </FlexCol>

          <FlexCol>
            <Typography type="description">Transaction overview</Typography>
            <FlexCol className="border-divider border-[0.667px] rounded-md  p-3 gap-1">
              <FlexRow className="justify-between">
                <Typography type="description">Assets to receive</Typography>
                <DisplayTokenAmount
                  {...previewWithdrawData?.assetsToReceive.tokenAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Value to receive</Typography>
                <DisplayMoney
                  {...previewWithdrawData?.assetsToReceive.dollarAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Transaction cost</Typography>
                <DisplayMoney
                  {...previewWithdrawData?.cost.dollarAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
            </FlexCol>
          </FlexCol>
          <Button
            type="submit"
            loading={isWithdrawPending}
            disabled={Number(amount) <= 0}
          >
            Withdraw
          </Button>
        </div>
      </Modal>
    </MyFormProvider>
  );
};
