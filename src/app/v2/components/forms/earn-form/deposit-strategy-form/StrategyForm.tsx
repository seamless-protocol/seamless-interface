import { useForm } from "react-hook-form";
import { useReadAaveOracleGetAssetPrice } from "../../../../../generated";
import { useWrappedDebounce } from "../../../../../state/common/hooks/useWrappedDebounce";
import { findILMStrategyByAddress, StrategyConfig } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewPreviewDeposit } from "../../../../../state/loop-strategy/hooks/useFetchViewPreviewDeposit";
import { useMutateDepositStrategy } from "../../../../../state/loop-strategy/mutations/useMutateDepositStrategy";
import { DepositModalFormData } from "../../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import { Tag } from "../../../../pages/test-page/tabs/earn-tab/Tag";
import { RHFAmountInputWrapper } from "../../../RHFAmountInputWrapper";
import { AddToStrategyButtons } from "./AddToStrategyButtons";
import { StrategySummary } from "./StrategySummary";
import { useFullTokenData, useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider, FlexRow, RHFInputSliderField, Tooltip, useToken } from "@shared";
import { useEarnFormContext } from "../contexts/useEarnFormContext";


export const StrategyForm = () => {
  const { asset } = useEarnFormContext();

  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <StrategyFormLocal strategy={strategy} />;
};

const StrategyFormLocal: React.FC<{
  strategy: StrategyConfig
}> = ({ strategy }) => {
  const { asset, onTransaction, hideTag, disableAssetPicker, overrideUrlSlug } = useEarnFormContext();
  const { data: tokenData } = useFullTokenData(asset);
  const methods = useForm({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount");

  const { showNotification } = useNotificationContext();

  const {
    data: { symbol: strategySymbol },
  } = useToken(strategy.address);

  const { depositAsync } = useMutateDepositStrategy(strategy.id);

  const { data: assetPrice } = useReadAaveOracleGetAssetPrice({
    args: [strategy?.underlyingAsset.address || ""],
  });
  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice, 500);
  const { data: previewDepositData } = useFetchViewPreviewDeposit(strategy.id, debouncedAmount);

  const onSubmitAsync = async (data: DepositModalFormData) => {
    if (previewDepositData) {
      await depositAsync(
        {
          amount: data.amount,
          sharesToReceive: previewDepositData.sharesToReceive.tokenAmount.bigIntValue || 0n,
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
                  {strategy && <WatchAssetComponentv2 {...strategy} symbol={strategySymbol} />}
                </FlexCol>
              ),
            });
          },
          onSettled: () => {
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
            <FlexCol className="gap-1 min-h-14">
              <Typography type="bold4">{asset ? "Add to strategy" : "Select Asset"}</Typography>
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>

            {(asset != null && !hideTag) && <Tag tag="ILM" />}
          </FlexRow>
          <RHFAmountInputWrapper
            overrideUrlSlug={disableAssetPicker ? undefined : overrideUrlSlug}
            assetAddress={disableAssetPicker ? asset : undefined}
            name="amount" />
        </FlexCol>

        <FlexCol className="gap-4">
          <Typography type="bold3">Multiplier</Typography>
          <FlexCol>
            <RHFInputSliderField name="test" min="0" max="2" enabledMax={0} />
            <FlexRow className="justify-between pl-1">
              <Typography type="medium3">3x</Typography>
              <Tooltip tooltip="Coming soon. . .">
                <Typography type="medium3">5x</Typography>
              </Tooltip>
              <Tooltip tooltip="Coming soon. . .">
                <Typography type="medium3">10x</Typography>
              </Tooltip>
            </FlexRow>
          </FlexCol>
        </FlexCol>

        <StrategySummary asset={asset} />
        <AddToStrategyButtons strategy={strategy} onTransaction={onTransaction} />
      </FlexCol>
    </MyFormProvider>
  );
};
