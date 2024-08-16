import { useForm } from "react-hook-form";
import {
  MyFormProvider,
  FlexCol,
  Typography,
  WatchAssetComponentv2,
  useNotificationContext,
  useToken,
  FlexRow,
} from "../../../../../../shared";
import { FormButtons } from "./FormButtons";
import { Summary } from "./Summary";
import { useMutateSupplyLending } from "../../../../../state/lending-borrowing/mutations/useMutateSupplyLending";
import { Tag } from "../../../asset-data/Tag";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { RHFSupplyAmountField } from "./RHFSupplyAmountField";
import { useFetchReserveTokenAddresses } from "../../../../../state/lending-borrowing/queries/useFetchReserveTokenAddresses";
import { useFetchViewMaxUserReserveDeposit } from "../../../../../state/lending-borrowing/hooks/useFetchViewMaxReserveDeposit";
import { WETH_ADDRESS } from "../../../../../../meta";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { RouterConfig } from "../../../../../router";
import { GauntletOptimized } from "../../../specific-components/GauntletOptimized";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";
import { useFetchAssetByAddress } from "../../../../../state/common/hooks/useFetchAssetByAddress";
import { getIsStrategy } from "../../../../../state/settings/configUtils";

interface DepositModalFormData {
  amount: string;
}

export const SupplyForm = () => {
  const { asset } = useFormSettingsContext();

  if (getIsStrategy(asset)) {
    return <div className="min-h-[1000px]" />;
  }

  return <SupplyFormLocal />;
}

const SupplyFormLocal = () => {
  const { asset, onTransaction, hideTag, overrideUrlSlug, disableAssetPicker } = useFormSettingsContext();
  const { data: assetState } = useFetchAssetByAddress(asset);

  const { data: tokenData } = useFullTokenData(asset);

  const { data: reserveTokenAddresses } = useFetchReserveTokenAddresses(asset);
  const { data: sTokenData } = useToken(reserveTokenAddresses?.aTokenAddress);

  const methods = useForm({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;

  const amount = watch("amount");

  const { showNotification } = useNotificationContext();

  const { supplyAsync } = useMutateSupplyLending(asset);

  const maxUserDepositData = useFetchViewMaxUserReserveDeposit(
    asset
  );

  const onSubmitAsync = async (data: DepositModalFormData) => {
    await supplyAsync(
      {
        amount: data.amount,
      },
      {
        onSuccess: (txHash) => {
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You Supplied {data.amount} {tokenData.symbol}
                </Typography>
                {sTokenData && (
                  <WatchAssetComponentv2
                    {...sTokenData}
                    logo={tokenData.logo}
                    address={reserveTokenAddresses.aTokenAddress}
                  />
                )}
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
          <FlexRow className="justify-between">
            <FlexCol className="gap-1 min-h-10">
              <Typography type="bold4">{tokenData?.name || "Select strategy to get started"}</Typography>
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>

            <div>
              <FlexRow className="gap-2">
                {asset != null && !hideTag && assetState?.tags.map((tag, index) => <Tag tag={tag} key={index} />)}

                {tokenData?.isGauntletOptimized && <GauntletOptimized />}
              </FlexRow>
            </div>
          </FlexRow>
          {asset === WETH_ADDRESS && (
            <FlexRow className="w-full">
              <Link to={RouterConfig.Routes.supplyEthLegacy} className="flex flex-row items-center justify-end gap-1">
                <Typography type="bold2" className="text-right">
                  To supply ETH, click here instead
                </Typography>
                <ArrowTopRightOnSquareIcon width={12} />
              </Link>
            </FlexRow>
          )}
          <RHFSupplyAmountField
            overrideUrlSlug={disableAssetPicker ? undefined : overrideUrlSlug}
            assetAddress={disableAssetPicker ? asset : undefined}
            protocolMaxValue={maxUserDepositData ? { ...maxUserDepositData } : undefined}
            name="amount"
          />
        </FlexCol>

        {asset && <Summary amount={amount} />}
        {asset && <FormButtons />}
      </FlexCol>
    </MyFormProvider>
  );
};
