import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Address, etherUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { cbEthAddress } from "../../../../generated/generated";
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
import { useWriteStrategyDeposit } from "../../../../state/loop-strategy/hooks/useWriteStrategyDeposit";
import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";
import { useERC20Approve } from "../../../../state/common/hooks/useERC20Approve";

export interface DepositModalFormData {
  amount: string;
}

interface DepositModalProps {
  id: number;
}

export const DepositModal = ({ id }: DepositModalProps) => {
  const strategyConfig = ilmStrategies[id];

  const account = useAccount();

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
  const debouncedAmount = useDebounce(amount, 500);

  const { isApproved, isApproving, approveAsync } = useERC20Approve(
    cbEthAddress,
    ilmStrategies[id].address,
    parseUnits(String(amount || 0), etherUnits.wei)
  );
  const { shares } = useFetchPreviewDeposit(
    strategyConfig.address,
    debouncedAmount
  );

  const onSubmitAsync = async (data: DepositModalFormData) => {
    console.log({ shares });
    if (shares) {
      await depositAsync(
        parseUnits(data.amount, 18),
        account.address as Address,
        shares
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
      <Modal header="Deposit cbETH" buttonText="Deposit" onClose={reset}>
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
            onClick={() => approveAsync()}
            loading={isApproving}
            disabled={isApproved || Number(amount) <= 0}
          >
            Approve to continue
          </Button>
          <Button
            type="submit"
            loading={isDepositPending}
            disabled={!isApproved || Number(amount) <= 0 || shares <= 0n}
          >
            Deposit
          </Button>
        </div>
      </Modal>
    </MyFormProvider>
  );
};
