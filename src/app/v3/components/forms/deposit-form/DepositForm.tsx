import { useForm } from "react-hook-form";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import { useWrappedDebounce } from "../../../../data/common/hooks/useWrappedDebounce";
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
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { RouterConfig } from "@router";
import { useFetchDepositSharesToReceive } from "../../../../data/ilmv1-deprecated/queries/useFetchDepositSharesToReceive";
import { parseUnits } from "viem";
import { useMutateDepositStrategy } from "../../../../data/ilmv1-deprecated/mutations/useMutateDepositStrategy";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import { Summary } from "./Summary";
import {
  FullStrategyData,
  useFetchFullStrategyData,
} from "../../../../data/ilmv1-deprecated/metadata/FullStrategyData.all";
import { useFullTokenData } from "../../../../data/common/meta-data-queries/useFullTokenData";
import { useFetchFormattedAssetPrice } from "../../../../data/common/queries/AssetPrice.hook";
import { LegacyPlatformDeprecationBanner } from "../../banner/LegacyPlatformDeprecationBanner";

export const DepositForm = () => {
  const { strategy } = useFormSettingsContext();
  const { data: strategyData } = useFetchFullStrategyData(strategy);

  if (!strategyData) {
    // eslint-disable-next-line no-console
    console.warn("Strategy not found!!!");
    return <div className="min-h-[1000px]" />;
  }

  return <StrategyFormLocal strategyData={strategyData} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const StrategyFormLocal: React.FC<{
  strategyData: FullStrategyData;
}> = ({ strategyData }) => {
  const { onTransaction } = useFormSettingsContext();
  const underlyingAssetAddress = strategyData.underlying;
  const {
    data: { symbol: underlyingAssetSymbol },
  } = useFullTokenData(underlyingAssetAddress);

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount", "");

  const { showNotification } = useNotificationContext();

  const {
    data: { decimals: underlyingAssetDecimals },
    isLoading: isUnderlyingAssetDecimalsLoading,
  } = useToken(strategyData?.underlying);

  const { depositAsync, isDepositPending } = useMutateDepositStrategy(strategyData);

  const { data: assetPrice } = useFetchFormattedAssetPrice(strategyData?.underlying);

  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice?.bigIntValue, 500);
  const previewDepositData = useFetchDepositSharesToReceive(debouncedAmount, strategyData?.address);

  const onSubmitAsync = async (data: FormData) => {
    await depositAsync(
      {
        amount: underlyingAssetDecimals ? parseUnits(data.amount, underlyingAssetDecimals) : undefined,
        previewDepositData,
      },
      {
        onSuccess: (txHash) => {
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You Supplied {data.amount} {underlyingAssetSymbol}
                </Typography>
                {strategyData && <WatchAssetComponentv2 {...strategyData} address={strategyData?.address} />}
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
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexCol className="gap-3">
            <LegacyPlatformDeprecationBanner />
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
          isDisabled={!previewDepositData.isSuccess}
          isLoading={previewDepositData.isLoading || isUnderlyingAssetDecimalsLoading || isDepositPending}
          strategy={strategyData}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
