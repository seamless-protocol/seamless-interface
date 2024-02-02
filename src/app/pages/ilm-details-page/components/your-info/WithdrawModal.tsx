import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
import {
  Button,
  FlexCol,
  FlexRow,
  Modal,
  MyFormProvider,
  Typography,
} from "../../../../../shared";
import { formatBigIntOnTwoDecimals } from "../../../../../shared/utils/helpers";
import { useForm } from "react-hook-form";
import AmountInputWrapper from "./amount-input/AmountInputWrapper";
import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";
import { useWriteStrategyWithdraw } from "../../../../state/loop-strategy/hooks/useWriteStrategyWithdraw";
import { useFetchPreviewWithdraw } from "../../../../state/loop-strategy/hooks/useFetchPreviewWithdraw";

export interface WithdrawModalFormData {
  amount: string;
}

interface WithdrawModalProps {
  id: number;
}

export const WithdrawModal = ({ id }: WithdrawModalProps) => {
  const strategyConfig = ilmStrategies[id];
  const account = useAccount();

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
  const debouncedAmount = useDebounce(amount, 500);

  const { shares } = useFetchPreviewWithdraw(
    strategyConfig.address,
    debouncedAmount
  );

  const onSubmitAsync = async (data: WithdrawModalFormData) => {
    if (shares) {
      await withdrawAsync(
        parseUnits(data.amount, 18),
        account.address as Address,
        account.address as Address,
        shares
      );
    }
  };

  useEffect(() => {
    if (isWithdrawSuccessful) {
      reset();
    }
  }, [isWithdrawSuccessful, reset]);

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <Modal header="Withdraw cbETH" buttonText="Withdraw" onClose={reset}>
        <div className="flex flex-col gap-4">
          <FlexCol>
            <Typography type="description">Amount</Typography>
            <AmountInputWrapper
              assetAddress={strategyConfig.address}
              assetSymbol={strategyConfig.symbol}
              assetLogo={strategyConfig.logo}
              debouncedAmount={debouncedAmount}
              isDepositSuccessful={isWithdrawSuccessful}
            />
          </FlexCol>

          <FlexCol>
            <Typography type="description">Transaction overview</Typography>
            <FlexCol className="border-divider border-[0.667px] rounded-md  p-3">
              <FlexRow className="justify-between">
                <Typography type="description">Assets to receive</Typography>
                <Typography type="description">
                  {formatBigIntOnTwoDecimals(shares, 18)}
                  {" " + strategyConfig.underlyingAsset.symbol}
                </Typography>
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
