import { useRef } from "react";
import { useForm } from "react-hook-form";
import { etherUnits, parseUnits } from "viem";
import {
  AddCoinToWallet,
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
} from "@shared";
import { useReadAaveOracleGetAssetPrice } from "../../../../generated/generated";
import { useERC20Approve } from "../../../../state/common/hooks/useERC20Approve";
import { useWrappedDebounce } from "../../../../state/common/hooks/useWrappedDebounce";
import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewPreviewDeposit } from "../../../../state/loop-strategy/hooks/useFetchViewPreviewDeposit";

import AmountInputWrapper from "./amount-input/AmountInputWrapper";
import { useMutateDepositStrategy } from "../../../../state/loop-strategy/mutations/useMutateDepositStrategy";

export interface DepositModalFormData {
  amount: string;
}

interface DepositModalProps extends Omit<ButtonProps, "id"> {
  id: number;
}

export const DepositModal = ({ id, ...buttonProps }: DepositModalProps) => {
  const strategyConfig = ilmStrategies[id];
  const { showNotification } = useNotificationContext();
  const modalRef = useRef<ModalHandles | null>(null);

  const { data: assetPrice } = useReadAaveOracleGetAssetPrice({
    args: [strategyConfig.underlyingAsset.address],
  });

  const { depositAsync, isDepositPending } = useMutateDepositStrategy(id);

  // FORM //
  const methods = useForm<DepositModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount");
  const { debouncedAmount, debouncedAmountInUsd } = useWrappedDebounce(
    amount,
    assetPrice,
    500
  );

  const { isApproved, isApproving, approveAsync } = useERC20Approve(
    ilmStrategies[id].underlyingAsset.address,
    ilmStrategies[id].address,
    parseUnits(amount || "0", etherUnits.wei)
  );
  const { data: previewDepositData, isLoading } = useFetchViewPreviewDeposit(
    id,
    debouncedAmount
  );

  const onSubmitAsync = async (data: DepositModalFormData) => {
    if (previewDepositData) {
      await depositAsync(
        {
          amount: data.amount,
          sharesToReceive:
            previewDepositData.sharesToReceive.tokenAmount.bigIntValue || 0n,
        },
        {
          onSuccess: (txHash) => {
            showNotification({
              txHash,
              content: (
                <FlexCol className="w-full items-center text-center justify-center">
                  <Typography>
                    You Supplied {data.amount}{" "}
                    {ilmStrategies[id].underlyingAsset.symbol}
                  </Typography>
                  <AddCoinToWallet {...ilmStrategies[id]} />
                </FlexCol>
              ),
            });
          },
          onSettled: () => {
            modalRef.current?.close();
          },
        }
      );
    }
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <Modal
        ref={modalRef}
        header={`Deposit ${strategyConfig.underlyingAsset.symbol}`}
        buttonText="Deposit"
        onClose={reset}
        buttonProps={{ ...buttonProps }}
      >
        <div className="flex flex-col gap-4">
          <FlexCol>
            <Typography type="description">Amount</Typography>
            <AmountInputWrapper
              assetAddress={strategyConfig.underlyingAsset.address}
              assetSymbol={strategyConfig.underlyingAsset.symbol}
              assetLogo={strategyConfig.underlyingAsset.logo}
              debouncedAmountInUsd={debouncedAmountInUsd}
            />
          </FlexCol>

          <FlexCol>
            <Typography type="description">Transaction overview</Typography>
            <FlexCol className="border-divider border-[0.667px] rounded-md p-3 gap-1">
              <FlexRow className="justify-between">
                <Typography type="description">Shares to receive</Typography>
                <DisplayTokenAmount
                  {...previewDepositData?.sharesToReceive.tokenAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Value to receive</Typography>
                <DisplayMoney
                  {...previewDepositData?.sharesToReceive.dollarAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Transaction cost</Typography>
                <DisplayMoney
                  {...previewDepositData?.cost.dollarAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
            </FlexCol>
          </FlexCol>
          {Number(amount) > 0 && (
            <Button
              onClick={() => approveAsync()}
              loading={isApproving}
              disabled={isApproved || Number(amount) <= 0}
            >
              Approve to continue
            </Button>
          )}
          <Button
            type="submit"
            loading={isDepositPending}
            disabled={!isApproved || Number(amount) <= 0}
          >
            {Number(amount) > 0 ? "Deposit" : "Enter an amount"}
          </Button>
        </div>
      </Modal>
    </MyFormProvider>
  );
};
