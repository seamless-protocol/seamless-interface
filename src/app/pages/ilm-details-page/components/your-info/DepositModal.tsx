import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Address, parseUnits } from "viem";
import { useAccount } from "wagmi";
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
import { useWriteStrategyDeposit } from "../../../../state/loop-strategy/hooks/useWriteStrategyDeposit";
import { useWriteAssetApprove } from "../../../../state/common/hooks/useWriteAssetApprove";
import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";

export interface DepositModalFormData {
  amount: string;
}

interface DepositModalProps {
  id: number;
}

export const DepositModal = ({ id }: DepositModalProps) => {
  const strategyConfig = ilmStrategies[id];

  const account = useAccount();

  const { isDepositPending, isDepositSuccessful, deposit } =
    useWriteStrategyDeposit(id);
  const {
    isPending: isApprovalPending,
    isSuccess: isAppovalSuccessful,
    approve: approve,
  } = useWriteAssetApprove(strategyConfig.underlyingAsset.address);

  const { allowance } = useFetchAssetAllowance(
    strategyConfig.underlyingAsset.address,
    strategyConfig.address,
    isAppovalSuccessful,
    isDepositSuccessful
  );

  // FORM //
  const methods = useForm<DepositModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount");
  const debouncedAmount = useDebounce(amount, 500);

  const { shares } = useFetchPreviewDeposit(
    strategyConfig.address,
    debouncedAmount
  );

  const onSubmitAsync = (data: DepositModalFormData) => {
    if (shares) {
      deposit(parseUnits(data.amount, 18), account.address as Address, shares);
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
              assetAddress={strategyConfig.underlyingAsset.address}
              assetSymbol={strategyConfig.underlyingAsset.symbol}
              assetLogo={strategyConfig.underlyingAsset.logo}
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
                  {" " + strategyConfig.symbol}
                </Typography>
              </FlexRow>
            </FlexCol>
          </FlexCol>
          <Button
            onClick={() =>
              approve(strategyConfig.address, parseUnits(amount || "0", 18))
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
            loading={isDepositPending}
            disabled={
              parseFloat(String(allowance)) < parseFloat(amount) ||
              Number(amount) <= 0
            }
          >
            Deposit cbETH
          </Button>
        </div>
      </Modal>
    </MyFormProvider>
  );
};
