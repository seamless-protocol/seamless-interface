import { useRef } from "react";
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
  Tooltip,
  Typography,
  useNotificationContext,
  useToken,
} from "@shared";
import { useWrappedDebounce } from "../../../../../../state/common/hooks/useWrappedDebounce";
import { ilmStrategies } from "../../../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewPreviewWithdraw } from "../../../../../../state/loop-strategy/hooks/useFetchViewPreviewWithdraw";
import { useWriteStrategyWithdraw } from "../../../../../../state/loop-strategy/mutations/useWriteStrategyWithdraw";
import { AmountInputWithdrawWrapper } from "./AmountInputWithdrawWrapper";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchAssetPrice } from "../../../../../../state/common/queries/useFetchViewAssetPrice";

export interface WithdrawModalFormData {
  amount: string;
}

interface WithdrawModalProps extends Omit<ButtonProps, "id"> {
  id: number;
}

export const WithdrawModal = ({ id, ...buttonProps }: WithdrawModalProps) => {
  const strategyConfig = ilmStrategies[id];

  const {
    data: { symbol: strategySymbol },
  } = useToken(strategyConfig.address);

  const account = useAccount();
  const { showNotification } = useNotificationContext();
  const modalRef = useRef<ModalHandles | null>(null);
  const queryClient = useQueryClient();

  const { data: price } = useFetchAssetPrice(strategyConfig.address);

  const { isPending: isWithdrawPending, withdrawAsync } = useWriteStrategyWithdraw(id);

  // FORM //
  const methods = useForm<WithdrawModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount");
  const { debouncedAmount, debouncedAmountInUsd } = useWrappedDebounce(amount, price.bigIntValue, 500);

  const { data: previewWithdrawData, isLoading, isFetched } = useFetchViewPreviewWithdraw(id, debouncedAmount);

  const onSubmitAsync = async (data: WithdrawModalFormData) => {
    if (previewWithdrawData) {
      try {
        const { txHash } = await withdrawAsync(
          parseUnits(data.amount, 18),
          account.address as Address,
          account.address as Address,
          previewWithdrawData?.assetsToReceive.tokenAmount.bigIntValue || 0n
        );
        modalRef.current?.close();
        showNotification({
          txHash,
          content: `You Withdrew ${data.amount} ${strategySymbol}`,
        });
        queryClient.invalidateQueries();
      } catch (e) {
        modalRef.current?.close();
        showNotification({
          status: "error",

          content: (e as any)?.shortMessage,
        });
      }
    }
  };

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
            <AmountInputWithdrawWrapper id={id} debouncedAmountInUsd={debouncedAmountInUsd} />
          </FlexCol>

          <FlexCol>
            <Typography type="description">Transaction overview</Typography>
            <FlexCol className="border-divider border-[0.667px] rounded-md  p-3 gap-1">
              <FlexRow className="justify-between">
                <Typography type="description">Min Assets to receive</Typography>
                <Tooltip tooltip={previewWithdrawData.assetsToReceive.tokenAmount.symbol} size="small">
                  <DisplayTokenAmount
                    {...previewWithdrawData?.assetsToReceive.tokenAmount}
                    typography="description"
                    isLoading={isLoading}
                    isFetched={isFetched}
                  />
                </Tooltip>
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Min Value to receive</Typography>
                <DisplayMoney
                  {...previewWithdrawData?.assetsToReceive.dollarAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Max Transaction cost</Typography>
                <DisplayMoney
                  {...previewWithdrawData?.cost.dollarAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
            </FlexCol>
          </FlexCol>
          <Button type="submit" loading={isWithdrawPending} disabled={Number(amount) <= 0}>
            Withdraw
          </Button>
        </div>
      </Modal>
    </MyFormProvider>
  );
};
