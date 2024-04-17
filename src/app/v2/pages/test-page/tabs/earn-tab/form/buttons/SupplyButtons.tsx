import { lendingPoolAddress } from "@generated";
import {
  useFullTokenData,
  useNotificationContext,
  useERC20Approve,
  FlexCol,
  Typography,
  WatchAssetComponentv2,
  AuthGuardv2,
  Buttonv2,
} from "@shared";
import { useFormContext } from "react-hook-form";
import { parseUnits, etherUnits } from "viem";
import { assetSlugConfig, earnInputConfig } from "../../config/SlugConfig";
import { useMutateSupplyLending } from "../../../../../../../state/lending-borrowing/mutations/useMutateSupplyLending";
import { DepositModalFormData } from "../../../../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import { useAssetPickerState } from "../../../../../../hooks/useAssetPickerState";

export const SupplyButtons = () => {
  const { asset } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { data: tokenData } = useFullTokenData(asset);

  const { showNotification } = useNotificationContext();

  const { watch, reset } = useFormContext();
  const amount = watch(earnInputConfig.name);

  const { isApproved, isApproving, approveAsync } = useERC20Approve(
    asset,
    lendingPoolAddress,
    parseUnits(amount || "0", etherUnits.wei)
  );

  const { supplyAsync, isSupplyPending } = useMutateSupplyLending(asset);

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
                {tokenData && <WatchAssetComponentv2 {...tokenData} symbol={tokenData.symbol || ""} address={asset} />}
              </FlexCol>
            ),
          });
        },
        onSettled: () => {
          reset();
        },
      }
    );
  };

  if (!amount) {
    return (<Buttonv2 className="text-bold3" disabled>
      Enter amount
    </Buttonv2>);
  }


  return (
    <FlexCol className="gap-2">
      <AuthGuardv2 message="">
        <Buttonv2 className="text-bold3" disabled={isApproved} loading={isApproving} onClick={approveAsync}>
          Approve
        </Buttonv2>
      </AuthGuardv2>
      <Buttonv2
        className="text-bold3"
        type="submit"
        disabled={!isApproved}
        loading={isSupplyPending}
        onClick={() =>
          onSubmitAsync({
            amount,
          })
        }
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
