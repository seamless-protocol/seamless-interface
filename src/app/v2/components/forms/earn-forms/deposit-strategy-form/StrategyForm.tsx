import { useForm } from "react-hook-form";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import { useReadAaveOracleGetAssetPrice } from "../../../../../generated";
import { useWrappedDebounce } from "../../../../../state/common/hooks/useWrappedDebounce";
import { findILMStrategyByAddress, StrategyConfig } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewPreviewDeposit } from "../../../../../state/loop-strategy/hooks/useFetchViewPreviewDeposit";
import { useMutateDepositStrategy } from "../../../../../state/loop-strategy/mutations/useMutateDepositStrategy";
import { DepositModalFormData } from "../../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import { Tag } from "../../../../pages/test-page/tabs/earn-tab/Tag";
import { FormButtons } from "./FormButtons";
import { Summary } from "./Summary";
import {
  useNotificationContext,
  FlexCol,
  Typography,
  WatchAssetComponentv2,
  MyFormProvider,
  FlexRow,
  useToken,
  DisplayTargetMultiple,
  RHFInputSliderField,
} from "@shared";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { RHFSupplyStrategyAmountField } from "./RHFSupplyStrategyAmountField";
import { RouterConfig } from "../../../../../router";
import { useFetchViewMaxUserDeposit } from "../../../../../state/loop-strategy/hooks/useFetchViewMaxUserDeposit";
import { getTokenTitle, getOverridenName } from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { useFetchViewTargetMultiple } from "../../../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";

export const StrategyForm = () => {
  const { asset, isStrategy } = useFormSettingsContext();

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
  const {
    data: targetMultipleData,
    ...restTargetMultiple
  } = useFetchViewTargetMultiple(strategy.address);

  const { asset, onTransaction, hideTag, disableAssetPicker, overrideUrlSlug } = useFormSettingsContext();
  const methods = useForm({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount", "");

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

  const maxUserDepositData = useFetchViewMaxUserDeposit(strategy.address);

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
            <FlexCol className="gap-1 min-h-14">
              <Typography type="bold4">
                {asset ? getTokenTitle(asset, true) : "Select strategy to get started"}
              </Typography>
              <Typography type="regular3">{asset ? getOverridenName(asset, undefined, true) : ""}</Typography>
            </FlexCol>

            {asset != null && !hideTag && <Tag tag="ILM" />}
          </FlexRow>
          {asset === WETH_ADDRESS && (
            <FlexRow className="w-full">
              <Link to={RouterConfig.Routes.wrapEth} className="flex flex-row items-center justify-end gap-1" target="_blank" rel="noopener noreferrer">
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
            protocolMaxValue={maxUserDepositData}
            name="amount"
          />
          <RHFInputSliderField name="k" max={2} min={0} />
        </FlexCol>

        <FlexCol className="gap-4">
          <FlexRow className="justify-between pr-2">
            <Typography type="bold3">Target Multiple</Typography>
            <DisplayTargetMultiple
              typography="bold3"
              {...restTargetMultiple}
              {...targetMultipleData}
            />
          </FlexRow>
          {/* <FlexCol>
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
          </FlexCol> */}
        </FlexCol>

        {asset && <Summary asset={asset} previewDepositData={previewDepositData} />}
        <FormButtons strategy={strategy} onTransaction={onTransaction} />
      </FlexCol>
    </MyFormProvider>
  );
};
