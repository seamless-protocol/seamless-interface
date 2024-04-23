import { FlexCol, AuthGuardv2, Buttonv2, useERC20Approve } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits, etherUnits, Address } from "viem";
import { earnInputConfig } from "../../../pages/test-page/tabs/earn-tab/config/SlugConfig";
import { findILMStrategyByAddress, StrategyConfig } from "../../../../state/loop-strategy/config/StrategyConfig";

export const AddToStrategyButtonsWrapper: React.FC<{
  asset: Address;
}> = ({ asset }) => {
  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    if (asset) console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <AddToStrategyButtons strategy={strategy} />;
};

export const AddToStrategyButtons: React.FC<{
  strategy: StrategyConfig;
}> = ({ strategy }) => {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch(earnInputConfig.name);

  const { isApproved, isApproving, approveAsync } = useERC20Approve(
    strategy.underlyingAsset.address,
    strategy.address,
    parseUnits(amount || "0", etherUnits.wei)
  );

  if (!amount) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        Enter amount
      </Buttonv2>
    );
  }

  return (
    <FlexCol className="gap-2">
      <AuthGuardv2 message="">
        <Buttonv2 className="text-bold3" disabled={isApproved} loading={isApproving} onClick={approveAsync}>
          Approve
        </Buttonv2>
      </AuthGuardv2>
      <Buttonv2 className="text-bold3" type="submit" disabled={!isApproved || isSubmitting} loading={isSubmitting}>
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
