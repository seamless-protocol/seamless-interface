import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Address, etherUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import {
  Button,
  ButtonProps,
  DisplayMoney,
  DisplayTokenAmount,
  FlexCol,
  FlexRow,
  Modal,
  MyFormProvider,
  Typography,
} from "../../../../../shared";
import { useReadAaveOracleGetAssetPrice } from "../../../../generated/generated";
import { useERC20Approve } from "../../../../state/common/hooks/useERC20Approve";
import { useWrappedDebounce } from "../../../../state/common/hooks/useWrappedDebounce";
import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewPreviewDeposit } from "../../../../state/loop-strategy/hooks/useFetchViewPreviewDeposit";
import { useWriteStrategyDeposit } from "../../../../state/loop-strategy/hooks/useWriteStrategyDeposit";
import AmountInputWrapper from "./amount-input/AmountInputWrapper";

export interface DepositModalFormData {
  amount: string;
}

interface DepositModalProps extends Omit<ButtonProps, "id"> {
  id: number;
}

export const DepositModal = ({ id, ...buttonProps }: DepositModalProps) => {
  const strategyConfig = ilmStrategies[id];
  const account = useAccount();

  const { data: assetPrice } = useReadAaveOracleGetAssetPrice({
    args: [strategyConfig.underlyingAsset.address],
  });
  const {
    isPending: isDepositPending,
    isSuccess: isDepositSuccessful,
    depositAsync,
  } = useWriteStrategyDeposit(id);

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
  const { data: previewDepositData } = useFetchViewPreviewDeposit(
    id,
    debouncedAmount
  );

  const onSubmitAsync = async (data: DepositModalFormData) => {
    if (previewDepositData) {
      await depositAsync(
        parseUnits(data.amount, 18),
        account.address as Address,
        previewDepositData.minReceivingShares
      );
    }
  };

  useEffect(() => {
    if (isDepositSuccessful) {
      reset();
    }
  }, [isDepositSuccessful, reset]);

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <Modal
        header="Deposit cbETH"
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
              isDepositSuccessful={isDepositSuccessful}
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
                />
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Value to receive</Typography>
                <DisplayMoney
                  {...previewDepositData?.sharesToReceive.dollarAmount}
                  typography="description"
                />
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Transaction cost</Typography>
                <DisplayMoney
                  {...previewDepositData?.cost.dollarAmount}
                  typography="description"
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
