import { useForm } from "react-hook-form";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import { useReadAaveOracleGetAssetPrice } from "../../../../../generated";
import { useWrappedDebounce } from "../../../../../state/common/hooks/useWrappedDebounce";
import { useMutateDepositStrategy } from "../../../../../state/loop-strategy/mutations/useMutateDepositStrategy";
import { Tag } from "../../../asset-data/Tag";
import { FormButtons } from "./FormButtons";
import { Summary } from "./Summary";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider, FlexRow, useToken } from "@shared";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { RHFSupplyStrategyAmountField } from "./RHFSupplyStrategyAmountField";
import { RouterConfig } from "../../../../../router";
import { RHFStrategySelector } from "./RHFStrategySelector";
import { StrategyState } from "../../../../../state/common/types/StateTypes";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";
import { useEffect } from "react";
import { useFetchStrategyByAddress } from "../../../../../state/common/hooks/useFetchStrategyByAddress";
import { useFetchDepositSharesToReceive } from "../../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive";
import { AuditedByCertora } from "../../../specific-components/AuditedByCertora";
import { parseUnits } from "viem";

export const StrategyForm = () => {
  const { asset, isStrategy } = useFormSettingsContext();
  const { data: strategy } = useFetchStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    if (!asset && isStrategy) console.warn("Strategy not found!!!");
    return <div className="min-h-[1000px]" />;
  }

  return <StrategyFormLocal strategy={strategy} />;
};

interface FormData {
  amount: string;
  sliderValue: number;
}

const StrategyFormLocal: React.FC<{
  strategy: StrategyState;
}> = ({ strategy }) => {
  const { onTransaction, subStrategy, hideTag, disableAssetPicker, overrideUrlSlug } = useFormSettingsContext();
  const asset = strategy?.underlyingAsset.address;

  const subStrIndex = strategy.subStrategyData.findIndex((x) => x.address === subStrategy);
  const initialSliderValue = subStrIndex === -1 ? 0 : subStrIndex;

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      sliderValue: initialSliderValue,
    },
  });
  const { handleSubmit, watch, reset, setValue } = methods;
  const amount = watch("amount", "");

  useEffect(() => {
    setValue("sliderValue", initialSliderValue);
  }, [strategy?.subStrategyData?.length]);

  const { showNotification } = useNotificationContext();

  const {
    data: { name, subTitle },
  } = useFullTokenData(strategy.address);
  const { data: { decimals: underlyingAssetDecimals }, isLoading: isUnderlyingAssetDecimalsLoading } = useToken(strategy?.underlyingAsset?.address);

  const { depositAsync } = useMutateDepositStrategy(strategy, subStrategy);

  const { data: assetPrice } = useReadAaveOracleGetAssetPrice({
    args: [strategy?.underlyingAsset.address],
  });

  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice, 500);
  const previewDepositData = useFetchDepositSharesToReceive(debouncedAmount, subStrategy);

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
                  {strategy && <WatchAssetComponentv2 {...strategy} address={subStrategy} />}
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
          <FlexRow className="justify-between items-start">
            <FlexCol className="gap-1 min-h-10">
              <Typography type="bold4">{name || "Select strategy to get started"}</Typography>
              <Typography type="regular3">{subTitle || ""}</Typography>
            </FlexCol>

            {asset != null && !hideTag && <Tag tag="ILM" />}
          </FlexRow>
          {asset === WETH_ADDRESS && (
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
          <RHFSupplyStrategyAmountField
            overrideUrlSlug={disableAssetPicker ? undefined : overrideUrlSlug}
            assetAddress={disableAssetPicker ? asset : undefined}
            name="amount"
          />
        </FlexCol>

        <RHFStrategySelector name="sliderValue" strategy={strategy} />

        {asset && <Summary debouncedAmount={debouncedAmount} />}

        <AuditedByCertora />

        <FormButtons
          isLoading={previewDepositData.isLoading || isUnderlyingAssetDecimalsLoading}
          strategy={strategy}
          subStrategyAddress={subStrategy}
          onTransaction={onTransaction}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
