import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider, FlexRow } from "@shared";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { RouterConfig } from "@router";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import { Summary } from "./Summary";
import { LeverageToken } from "../../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const DepositLeverageTokenForm = () => {
  const {
    selectedLeverageToken: { data: leverageToken, isLoading, error },
  } = useLeverageTokenFormContext();

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!leverageToken || error) {
    // eslint-disable-next-line no-console
    console.warn("Leverage token not found!!!");
    if (error) console.error("LeverageTokenForm error while fetching info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching Leverage token info: {error?.message}
        </Typography>
      </div>
    );
  }

  return <LeverageFormLocal leverageToken={leverageToken} />;
};

const LeverageFormLocal: React.FC<{
  leverageToken: LeverageToken;
}> = ({ leverageToken }) => {
  const { onTransaction, formOnSubmitAsync, methods, depositAmount } = useLeverageTokenFormContext();
  const {
    underlyingAssetAddress,
    underlyingAsset: { symbol: underlyingAssetSymbol },
  } = leverageToken;

  const { showNotification } = useNotificationContext();

  const onSubmitAsync = async () => {
    await formOnSubmitAsync(
      {},
      {
        onSuccess: (txHash) => {
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You Supplied {depositAmount} {underlyingAssetSymbol}
                </Typography>
                {leverageToken && <WatchAssetComponentv2 {...leverageToken} address={leverageToken?.address} />}
              </FlexCol>
            ),
          });
        },
        onSettled: () => {
          onTransaction?.();
        },
      }
    );
  };

  return (
    <MyFormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmitAsync)}>
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
            <RHFReceiveAmountField name="receiveAmount" />
          </FlexCol>

          <Summary />
        </FlexCol>

        <FormButtons />
      </FlexCol>
    </MyFormProvider>
  );
};
