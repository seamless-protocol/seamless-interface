import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import {
  cbEthAddress,
  loopStrategyAddress,
  useWriteCbEthApprove,
  useWriteLoopStrategyDeposit,
  useWriteLoopStrategyRedeem,
} from "../../../../generated/generated";
import { useFetchAssetAllowance } from "../../../../state/common/hooks/useFetchAssetAllowance";
import { useFetchPreviewDeposit } from "../../../../state/loop-strategy/hooks/useFetchPreviewDeposit";
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
import AmountInputWrapper from "./AmountInput/AmountInputWrapper";

export interface WithdrawModalFormData {
  amount: string;
}

export const WithdrawModal = () => {
  const account = useAccount();

  // FETCH //
  const {
    writeContract: withdraw,
    isPending: isWithdrawPending,
    //todo: what if user Withdrawes twice??
    isSuccess: isWithdrawSuccessful,
  } = useWriteLoopStrategyRedeem();
  const {
    writeContract: approve,
    isPending: isApprovalPending,
    isSuccess: isAppovalSuccessful,
  } = useWriteCbEthApprove();

  const { allowance } = useFetchAssetAllowance(
    cbEthAddress,
    isAppovalSuccessful,
    isWithdrawSuccessful
  );

  // FORM //
  const methods = useForm<WithdrawModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount");
  const debouncedAmount = useDebounce(amount, 500);

  const { shares } = useFetchPreviewWithdraw(debouncedAmount);

  const onSubmitAsync = (data: WithdrawModalFormData) => {
    if (shares) {
      withdraw({
        args: [
          parseUnits(data.amount, 18),
          account.address as `0x${string}`,
          shares,
        ],
      });
    }
  };

  useEffect(() => {
    if (isWithdrawSuccessful) {
      reset();
    }
  }, [isWithdrawSuccessful, reset]);

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <Modal header="Withdraw cbETH" buttonText="Withdraw">
        <div className="flex flex-col gap-4">
          <FlexCol>
            <Typography type="description">Amount</Typography>
            <AmountInputWrapper
              debouncedAmount={debouncedAmount}
              isWithdrawSuccessful={isWithdrawSuccessful}
            />
          </FlexCol>

          <FlexCol>
            <Typography type="description">Transaction overview</Typography>
            <FlexCol className="border-divider border-[0.667px] rounded-md  p-3">
              <FlexRow className="justify-between">
                <Typography type="description">Shares to receive</Typography>
                <Typography type="description">
                  {formatBigIntOnTwoDecimals(shares, 18)}
                </Typography>
              </FlexRow>
            </FlexCol>
          </FlexCol>
          <Button
            onClick={() =>
              approve({
                args: [loopStrategyAddress, parseUnits(amount || "0", 18)],
              })
            }
            loading={isApprovalPending}
            disabled={
              parseFloat(String(allowance)) >= parseFloat(amount) ||
              Number(amount) <= 0
            }
          >
            Approve cbETH to continue
          </Button>
          <Button
            type="submit"
            loading={isWithdrawPending}
            disabled={
              parseFloat(String(allowance)) < parseFloat(amount) ||
              Number(amount) <= 0
            }
          >
            Withdraw cbETH
          </Button>
        </div>
      </Modal>
    </MyFormProvider>
  );
};
