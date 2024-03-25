import { useRef } from "react";
import { useForm } from "react-hook-form";
import { etherUnits, parseUnits } from "viem";
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
  StandardTooltip,
  Tooltip,
  Typography,
  WatchAssetComponent,
  useERC20Approve,
  useNotificationContext,
  useToken,
} from "@shared";
import { useReadAaveOracleGetAssetPrice } from "../../../../../generated/generated";
import { useWrappedDebounce } from "../../../../../state/common/hooks/useWrappedDebounce";
import { ilmStrategies } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewPreviewDeposit } from "../../../../../state/loop-strategy/hooks/useFetchViewPreviewDeposit";
import { useMutateDepositStrategy } from "../../../../../state/loop-strategy/mutations/useMutateDepositStrategy";
import { AmountInputDepositWrapper } from "./AmountInputDepositWrapper";

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

  const {
    data: { symbol: strategySymbol },
  } = useToken(strategyConfig.address);

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
                  <AddCoinToWallet
                    {...ilmStrategies[id]}
                    symbol={strategySymbol}
                  />
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
            <AmountInputDepositWrapper
              id={id}
              debouncedAmountInUsd={debouncedAmountInUsd}
            />
          </FlexCol>

          <FlexCol>
            <Typography type="description">Transaction overview</Typography>
            <FlexCol className="border-divider border-[0.667px] rounded-md p-3 gap-1">
              <FlexRow className="justify-between">
                <Typography type="description">
                  Min shares to receive
                </Typography>

                <Tooltip
                  tooltip={
                    previewDepositData?.sharesToReceive.tokenAmount.symbol
                  }
                  size="small"
                >
                  <DisplayTokenAmount
                    {...previewDepositData?.sharesToReceive.tokenAmount}
                    typography="description"
                    className="w-32"
                    isLoading={isLoading}
                  />
                </Tooltip>
              </FlexRow>
              <FlexRow className="justify-between">
                <Typography type="description">Min value to receive</Typography>
                <DisplayMoney
                  {...previewDepositData?.sharesToReceive.dollarAmount}
                  typography="description"
                  isLoading={isLoading}
                />
              </FlexRow>
              <FlexRow className="justify-between">
                <FlexRow className="items-center gap-1">
                  <Typography type="description">
                    Max transaction cost
                  </Typography>
                  <StandardTooltip width={1}>
                    <Typography type="subheader2">
                      DEX fees incurred to keep the strategy <br /> at the
                      target multiple after your deposit.
                    </Typography>
                  </StandardTooltip>
                </FlexRow>
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
