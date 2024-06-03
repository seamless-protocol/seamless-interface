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
import { Tag } from "../../../../pages/test-page/tabs/earn-tab/Tag";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { RHFSupplyAmountField } from "./RHFSupplyAmountField";
import { useFetchReserveTokenAddresses } from "../../../../../state/lending-borrowing/queries/useFetchReserveTokenAddresses";
import { useFetchViewMaxUserReserveDeposit } from "../../../../../state/lending-borrowing/hooks/useFetchViewMaxReserveDeposit";
import { WETH_ADDRESS } from "../../../../../../meta";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { RouterConfig } from "../../../../../router";
import { getTokenTitle } from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { GauntletOptimized } from "../../../specific-components/GauntletOptimized";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";

interface DepositModalFormData {
  amount: string;
}

export const SupplyForm = () => {
  const { asset, onTransaction, hideTag, overrideUrlSlug, disableAssetPicker } = useFormSettingsContext();

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

  const maxUserDepositData = useFetchViewMaxUserReserveDeposit(asset);

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
                    symbol={sTokenData.symbol || ""}
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
          <FlexRow className="justify-between items-start">
            <FlexCol className="gap-1 min-h-14 w-full">
              <Typography type="bold4">{asset ? getTokenTitle(asset) : "Select strategy to get started"}</Typography>
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>


            <FlexRow className="gap-1 items-center">
              {asset != null && !hideTag && <Tag tag="LEND" />}

              {tokenData?.isGauntletOptimized && <GauntletOptimized className="pr-4" />}
            </FlexRow>
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
