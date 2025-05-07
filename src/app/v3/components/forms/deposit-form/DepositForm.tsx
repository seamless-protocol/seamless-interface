import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider, FlexRow } from "@shared";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { RouterConfig } from "@router";
import { parseUnits } from "viem";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import { Summary } from "./Summary";
import { LegacyPlatformDeprecationBanner } from "../../banner/LegacyPlatformDeprecationBanner";
import { LeverageToken } from "../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";

import {
  DepositFormData,
  useLeverageTokenDepositFormContext,
} from "../contexts/leverage-token-form-provider/deposit/LeverageTokenDepositFormProvider";

export const DepositForm = () => {
  const {
    selectedLeverageToken: { data: leverageToken, isLoading, error },
  } = useLeverageTokenDepositFormContext();

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!leverageToken || error) {
    // eslint-disable-next-line no-console
    console.warn("Vault not found!!!");
    if (error) console.error("MorphoDepositForm error while fetching full vault info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full vault info: {error?.message}
        </Typography>
      </div>
    );
  }

  return <StrategyFormLocal leverageToken={leverageToken} />;
};

const StrategyFormLocal: React.FC<{
  leverageToken: LeverageToken;
}> = ({ leverageToken }) => {
  const { onTransaction, formOnSubmitAsync, methods, previewDepositData } = useLeverageTokenDepositFormContext();
  const {
    underlyingAssetAddress,
    underlyingAsset: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
  } = leverageToken;

  const { showNotification } = useNotificationContext();

  const onSubmitAsync = async (data: DepositFormData) => {
    await formOnSubmitAsync(
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
            <RHFReceiveAmountField name="receiveAmount" />
          </FlexCol>

          <Summary />
        </FlexCol>

        <FormButtons />
      </FlexCol>
    </MyFormProvider>
  );
};
