import { useForm } from "react-hook-form";
import {
  useFullTokenData,
  MyFormProvider,
  FlexCol,
  Typography,
  RHFInputSliderField,
  FlexRow,
  Tooltip,
  WatchAssetComponentv2,
  useNotificationContext,
  useToken,
} from "../../../../../shared";
import { useAssetPickerState } from "../../../hooks/useAssetPickerState";
import { assetSlugConfig, earnInputConfig } from "../../../pages/test-page/tabs/earn-tab/config/SlugConfig";
import { AddToStrategyButtonsWrapper } from "./AddToStrategyButtons";
import { StrategySummary } from "./StrategySummary";
import { RHFAmountInputWrapper } from "../../RHFAmountInputWrapper";
import { useReadAaveOracleGetAssetPrice } from "../../../../generated";
import { useWrappedDebounce } from "../../../../state/common/hooks/useWrappedDebounce";
import { useFetchViewPreviewDeposit } from "../../../../state/loop-strategy/hooks/useFetchViewPreviewDeposit";
import { useMutateDepositStrategy } from "../../../../state/loop-strategy/mutations/useMutateDepositStrategy";
import { DepositModalFormData } from "../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import React from "react";
import { StrategyConfig, findILMStrategyByAddress } from "../../../../state/loop-strategy/config/StrategyConfig";
import { Tag } from "../../../pages/test-page/tabs/earn-tab/Tag";

export const StrategyForm = () => {
  const { asset, isStrategy } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    if (!asset && isStrategy) console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <StrategyFormLocal strategy={strategy} />;
};

const StrategyFormLocal: React.FC<{
  strategy: StrategyConfig;
}> = ({ strategy }) => {
  const { asset } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
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
  const previewDepositData = useFetchViewPreviewDeposit(strategy.id, debouncedAmount);

  const onSubmitAsync = async (data: DepositModalFormData) => {
    if (previewDepositData?.data) {
      await depositAsync(
        {
          amount: data.amount,
          sharesToReceive: previewDepositData.data.sharesToReceive.tokenAmount.bigIntValue || 0n,
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

            {asset != null && <Tag tag="ILM" />}
          </FlexRow>
          <RHFAmountInputWrapper {...earnInputConfig} />
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
        <AddToStrategyButtonsWrapper asset={asset} />
      </FlexCol>
    </MyFormProvider>
  );
};
