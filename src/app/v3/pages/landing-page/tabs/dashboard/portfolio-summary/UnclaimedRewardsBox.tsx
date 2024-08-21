import { DisplayMoney, FlexCol, FlexRow, ImageGroup, Typography } from "../../../../../../../shared";
import { assetLogos } from "../../../../../../../meta";
import { ClaimButton } from "./ClaimButton";

export const UnclaimedRewardsBox = () => {
  return (
    <div>
      <FlexCol className="bg-neutral-0 rounded-xl border border-b-100 h-full p-8 justify-between">
        <FlexRow className="gap-[88px]">
          <FlexCol>
            <Typography type="regular5">Unclaimed rewards</Typography>
            <DisplayMoney viewValue="764.23" symbol="$" typography="bold6" />
          </FlexCol>

          <ClaimButton />
        </FlexRow>
        <ImageGroup
          imageStyle="w-6"
          spacing="-space-x-3"
          images={[assetLogos.get("SEAM") || "", assetLogos.get("USDC") || ""]}
        />
      </FlexCol>
    </div>
  );
};
