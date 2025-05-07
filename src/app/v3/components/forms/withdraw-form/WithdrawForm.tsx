import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useNotificationContext, MyFormProvider, FlexCol, FlexRow, Typography, WatchAssetComponentv2 } from "@shared";
import { WETH_ADDRESS } from "@meta";
import { RouterConfig } from "../../../../router";
import { useLeverageTokenWithdrawFormContext } from "../contexts/leverage-token-form-provider/withdraw/LeverageTokenWithdrawFormProvider";
import { RHFWithdrawStrategyAmountField } from "./RHFWithdrawStrategyAmountField";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import { Summary } from "./Summary";
import { FormButtons } from "./FormButtons";

export const WithdrawLeverageToken: React.FC = () => {
  const {
    selectedLeverageToken: { data: leverageToken, isLoading, error },
  } = useLeverageTokenWithdrawFormContext();

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

  return <WithdrawLeverageTokenLocal />;
};

export const WithdrawLeverageTokenLocal: React.FC = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotificationContext();
  const account = useAccount();

  const { selectedLeverageToken, methods, sharesToReceive, onTransaction, formOnSubmitAsync, amount } =
    useLeverageTokenWithdrawFormContext();
  const { data: { underlyingAsset, address, tokenData, underlyingAssetAddress } = {} } = selectedLeverageToken;

  const onSubmit = async () => {
    await formOnSubmitAsync(
      {
        shares: underlyingAsset?.decimals ? parseUnits(amount, underlyingAsset.decimals) : undefined,
        from: account.address as string,
        receiver: account.address as string,
        previewWithdrawData: sharesToReceive.data,
      },
      {
        onSuccess: (txHash) => {
          methods.reset();
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You Withdrew {amount} {underlyingAsset?.symbol}
                </Typography>
                <WatchAssetComponentv2 {...tokenData} address={address} />
                {underlyingAssetAddress === WETH_ADDRESS && (
                  <FlexRow className="w-full">
                    <Link
                      to={RouterConfig.Routes.unwrapEth}
                      className="flex flex-row items-center justify-end gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography type="bold2" className="text-right">
                        To unwrap ETH, click here
                      </Typography>
                      <ArrowTopRightOnSquareIcon width={12} />
                    </Link>
                  </FlexRow>
                )}
              </FlexCol>
            ),
          });
          queryClient.invalidateQueries();
        },
        onSettled: () => {
          onTransaction?.();
        },
      }
    );
  };

  return (
    <MyFormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-3">
          <Typography type="medium3">Withdraw</Typography>
          <RHFWithdrawStrategyAmountField name="amount" />
        </FlexCol>

        <FlexCol className="gap-3">
          <Typography type="medium3">Receive</Typography>
          <RHFReceiveAmountField name="receiveAmount" />
        </FlexCol>

        <Summary />

        <FormButtons />
      </FlexCol>
    </MyFormProvider>
  );
};
