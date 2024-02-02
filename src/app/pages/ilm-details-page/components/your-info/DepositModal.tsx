import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { etherUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import {
  cbEthAddress,
  loopStrategyAddress,
  useWriteLoopStrategyDeposit,
} from "../../../../generated/generated";
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
import AmountInputWrapper from "./amount-input/AmountInputWrapper";
import { useERC20Approve } from "../../../../state/common/hooks/useERC20Approve";

export interface DepositModalFormData {
  amount: string;
}

export const DepositModal = () => {
  const account = useAccount();

  // FETCH //
  const {
    writeContractAsync: depositAsync,
    isPending: isDepositPending,
    //todo: what if user deposites twice??
    isSuccess: isDepositSuccessful,
  } = useWriteLoopStrategyDeposit();

  // FORM //
  const methods = useForm<DepositModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount");
  const debouncedAmount = useDebounce(amount, 500);

  const { isApproved, isApproving, approveAsync } = useERC20Approve(
    cbEthAddress,
    loopStrategyAddress,
    parseUnits(String(amount || 0), etherUnits.wei)
  );

  const { shares } = useFetchPreviewDeposit(debouncedAmount);

  const onSubmitAsync = async (data: DepositModalFormData) => {
    if (shares) {
      await depositAsync({
        args: [
          parseUnits(data.amount, 18),
          account.address as `0x${string}`,
          shares,
        ],
      });
    }
  };

  useEffect(() => {
    if (isDepositSuccessful) {
      reset();
    }
  }, [isDepositSuccessful, reset]);

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <Modal header="Deposit cbETH" buttonText="Deposit">
        <div className="flex flex-col gap-4">
          <FlexCol>
            <Typography type="description">Amount</Typography>
            <AmountInputWrapper
              debouncedAmount={debouncedAmount}
              isDepositSuccessful={isDepositSuccessful}
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
            onClick={() => approveAsync(parseUnits(amount || "0", 18))}
            loading={isApproving}
            disabled={isApproved || Number(amount) <= 0}
          >
            Approve cbETH to continue
          </Button>
          <Button
            type="submit"
            loading={isDepositPending}
            disabled={!isApproved || Number(amount) <= 0 || shares <= 0n}
          >
            Deposit cbETH
          </Button>
        </div>
      </Modal>
    </MyFormProvider>
  );
};
