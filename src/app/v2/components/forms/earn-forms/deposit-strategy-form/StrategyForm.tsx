import { useForm } from "react-hook-form";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import { useReadAaveOracleGetAssetPrice } from "../../../../../generated";
import { useWrappedDebounce } from "../../../../../state/common/hooks/useWrappedDebounce";
import {
  findILMStrategyByAddress,
  ilmAssetStrategiesMap,
  StrategyConfig,
} from "../../../../../state/loop-strategy/config/StrategyConfig";
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
  useToken,
  DisplayTargetMultiple,
  FlexRow,
  RHFStrategySelector,
} from "@shared";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { RHFSupplyStrategyAmountField } from "./RHFSupplyStrategyAmountField";
import { RouterConfig } from "../../../../../router";
import { useFetchViewMaxUserDeposit } from "../../../../../state/loop-strategy/hooks/useFetchViewMaxUserDeposit";
import { getTokenTitle, getOverridenName } from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { useFetchViewTargetMultiple } from "../../../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { Address } from "viem";

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

interface FormData {
  amount: string;
  sliderValue: number;
  subStrategyAddress: Address;
}

const StrategyFormLocal: React.FC<{
  strategy: StrategyConfig;
}> = ({ strategy }) => {
  const subStrategyData = ilmAssetStrategiesMap.get(strategy.underlyingAsset.address);
  const { data: targetMultipleData, ...restTargetMultiple } = useFetchViewTargetMultiple(strategy.address);

  const { asset, onTransaction, hideTag, disableAssetPicker, overrideUrlSlug } = useFormSettingsContext();
  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      sliderValue: 0,
      subStrategyAddress: subStrategyData?.[0].address,
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount", "");
  const subStrategyAddress = watch("subStrategyAddress");

  const { showNotification } = useNotificationContext();

  const {
    data: { symbol: strategySymbol },
  } = useToken(strategy.address);

  const { depositAsync } = useMutateDepositStrategy(strategy.id, subStrategyAddress);

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
            protocolMaxValue={maxUserDepositData}
            name="amount"
          />
        </FlexCol>

        <FlexCol className="gap-4">
          <FlexRow className="justify-between pr-2">
            <Typography type="bold3">Target Multiple</Typography>
            <DisplayTargetMultiple typography="bold3" {...restTargetMultiple} {...targetMultipleData} />
          </FlexRow>
          <FlexCol>
            <RHFStrategySelector
              strategies={subStrategyData}
              name="sliderValue"
              strategyAddressFieldName="subStrategyAddress"
            />
          </FlexCol>
        </FlexCol>

        {asset && <Summary asset={asset} previewDepositData={previewDepositData} />}
        <FormButtons strategy={strategy} subStrategyAddress={subStrategyAddress} onTransaction={onTransaction} />
      </FlexCol>
    </MyFormProvider>
  );
};
