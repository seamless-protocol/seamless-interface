import { useForm } from "react-hook-form";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import { useReadAaveOracleGetAssetPrice } from "../../../../../generated";
import { useWrappedDebounce } from "../../../../../state/common/hooks/useWrappedDebounce";
import { FormButtons } from "./FormButtons";
import {
  useNotificationContext,
  FlexCol,
  Typography,
  WatchAssetComponentv2,
  MyFormProvider,
  FlexRow,
  useToken,
} from "@shared";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { RouterConfig } from "../../../../../router";
import { StrategyState } from "../../../../../state/common/types/StateTypes";
import { useFetchDepositSharesToReceive } from "../../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive";
import { parseUnits } from "viem";
import { useMutateDepositStrategy } from "../../../../../statev3/loop-strategy/mutations/useMutateDepositStrategy";
import { useFetchStrategyByAddress } from "../../../../../statev3/common/hooks/useFetchStrategyByAddress";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import { Summary } from "./Summary";

export const DepositForm = () => {
  const { strategy } = useFormSettingsContext();
  const { data: strategyState } = useFetchStrategyByAddress(strategy);

  if (!strategyState) {
    // eslint-disable-next-line no-console
    console.warn("Strategy not found!!!");
    return <div className="min-h-[1000px]" />;
  }

  // todo: remove any when config is migrated..
  return <StrategyFormLocal strategy={strategyState as any} />;
};

interface FormData {
  amount: string;
  sliderValue: number;
}

const StrategyFormLocal: React.FC<{
  strategy: StrategyState;
}> = ({ strategy }) => {
  const { onTransaction } = useFormSettingsContext();
  const underlyingAssetAddress = strategy?.underlyingAsset.address;

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount", "");

  const { showNotification } = useNotificationContext();

  const {
    data: { decimals: underlyingAssetDecimals },
    isLoading: isUnderlyingAssetDecimalsLoading,
  } = useToken(strategy?.underlyingAsset?.address);

  const { depositAsync } = useMutateDepositStrategy(strategy);

  const { data: assetPrice } = useReadAaveOracleGetAssetPrice({
    args: [strategy?.underlyingAsset.address],
  });

  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice, 500);
  const previewDepositData = useFetchDepositSharesToReceive(debouncedAmount, strategy?.address);

  const onSubmitAsync = async (data: FormData) => {
    if (previewDepositData.isFetched && previewDepositData.isSuccess && !previewDepositData.isLoading) {
      await depositAsync(
        {
          amount: underlyingAssetDecimals ? parseUnits(data.amount, underlyingAssetDecimals) : undefined,
          sharesToReceive: previewDepositData.data.sharesToReceive?.bigIntValue || 0n,
        },
        {
          onSuccess: (txHash) => {
            showNotification({
              txHash,
              content: (
                <FlexCol className="w-full items-center text-center justify-center">
                  <Typography>
                    You Supplied {data.amount} {strategy?.underlyingAsset.symbol}
                  </Typography>
                  {strategy && <WatchAssetComponentv2 {...strategy} address={strategy?.address} />}
                </FlexCol>
              ),
            });
          },
          onSettled: () => {
            onTransaction?.();
            reset();
          },
        }
      );
    }
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexCol className="gap-3">
            <Typography type="medium3">Deposit</Typography>
            <RHFDepositAmountField name="amount" />
          </FlexCol>

          {underlyingAssetAddress === WETH_ADDRESS && (
            <FlexRow className="w-full">
              <Link
                to={RouterConfig.Routes.wrapEth}
                className="flex flex-row items-center justify-end gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography type="bold2" className="text-right">
                  To wrap ETH, click here
                </Typography>
                <ArrowTopRightOnSquareIcon width={12} />
              </Link>
            </FlexRow>
          )}

          <FlexCol className="gap-3">
            <Typography type="medium3">Receive</Typography>
            <RHFReceiveAmountField debouncedAmount={debouncedAmount} name="receiveAmount" />
          </FlexCol>

          <Summary debouncedAmount={debouncedAmount} />
        </FlexCol>
        <FormButtons
          isLoading={previewDepositData.isLoading || isUnderlyingAssetDecimalsLoading}
          strategy={strategy}
          onTransaction={onTransaction}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
