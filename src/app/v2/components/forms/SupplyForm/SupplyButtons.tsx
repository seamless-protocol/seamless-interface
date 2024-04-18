import { lendingPoolAddress } from "@generated";
import {
  useERC20Approve,
  FlexCol,
  AuthGuardv2,
  Buttonv2,
} from "@shared";
import { useFormContext } from "react-hook-form";
import { parseUnits, etherUnits } from "viem";
import { assetSlugConfig, earnInputConfig } from "../../../pages/test-page/tabs/earn-tab/config/SlugConfig";
import { useAssetPickerState } from "../../../hooks/useAssetPickerState";

export const SupplyButtons = () => {
  const { asset } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });

  const { watch, formState: {
    isSubmitting
  } } = useFormContext();
  const amount = watch(earnInputConfig.name);

  const { isApproved, isApproving, approveAsync } = useERC20Approve(
    asset,
    lendingPoolAddress,
    parseUnits(amount || "0", etherUnits.wei)
  );

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
        disabled={!isApproved || isSubmitting}
        loading={isSubmitting}
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
