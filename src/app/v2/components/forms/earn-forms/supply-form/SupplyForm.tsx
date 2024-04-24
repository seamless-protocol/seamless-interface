import { useForm } from "react-hook-form";
import {
  useFullTokenData,
  MyFormProvider,
  FlexCol,
  Typography,
  WatchAssetComponentv2,
  useNotificationContext,
  FlexRow,
  useToken,
} from "../../../../../../shared";
import { FormButtons } from "./FormButtons";
import { Summary } from "./Summary";
import { useMutateSupplyLending } from "../../../../../state/lending-borrowing/mutations/useMutateSupplyLending";
import { DepositModalFormData } from "../../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import { Tag } from "../../../../pages/test-page/tabs/earn-tab/Tag";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { RHFSupplyAmountField } from "./RHFSupplyAmountField";
import { useFetchReserveTokenAddresses } from "../../../../../state/lending-borrowing/queries/useFetchReserveTokenAddresses";
import { useFetchViewMaxUserReserveDeposit } from "../../../../../state/lending-borrowing/hooks/useFetchViewMaxReserveDeposit";
import { IncentivesButton } from "../../../IncentivesButton";
import { IncentivesDetailCard } from "../../../IncentivesDetailCard";
import { useFetchViewSupplyIncentives } from "../../../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";

export const SupplyForm = () => {
  const { asset, onTransaction, hideTag, overrideUrlSlug, disableAssetPicker } = useFormSettingsContext();

  const { data: tokenData } = useFullTokenData(asset);

  const { data: reserveTokenAddresses } = useFetchReserveTokenAddresses(asset);
  const { data: sTokenData } = useToken(reserveTokenAddresses?.aTokenAddress);

  const { data: supplyIncentives, ...incentivesRest } = useFetchViewSupplyIncentives(asset);

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
            <FlexCol className="gap-1 min-h-14">
              <Typography type="bold4">{asset ? "Supply" : "Select Asset"}</Typography>
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>

            {asset != null && !hideTag && <FlexRow className="gap-1 items-center">
              <IncentivesButton {...supplyIncentives} {...incentivesRest}>
                <IncentivesDetailCard {...supplyIncentives} assetSymbol={tokenData.symbol} />
              </IncentivesButton>
              <Tag tag="LEND" /></FlexRow>}
          </FlexRow>
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
