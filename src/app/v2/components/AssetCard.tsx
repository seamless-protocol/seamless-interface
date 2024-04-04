import { FlexRow, FlexCol, Typography, Icon, useFullTokenData } from "@shared";
import { TagType, Tag } from "../pages/test-page/tabs/earn-tab/Tag";
import { Address } from "viem";
import { AssetApy } from "./AssetApy";

export interface AssetCardProps {
  address: Address;
  isStrategy: boolean;
  hideBorder?: boolean;
  tags?: TagType[];
  apy?: string;
  incentivesButton?: React.ReactNode;
  isSelected?: boolean;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  address,
  hideBorder,
  tags,
  incentivesButton,
  isSelected,
  isStrategy,
}) => {
  const {
    data: { logo: icon, name, shortName },
  } = useFullTokenData(address);

  return (
    <div
      className={`p-6 pr-8  ${hideBorder ? "" : "border-solid border-b border-b-navy-100"}
        ${isSelected ? "bg-neutral-100" : "bg-neutral-0"} cursor-pointer`}
    >
      <FlexRow className="gap-10 justify-between">
        <FlexRow className="gap-4 items-start">
          <Icon width={40} src={icon} alt={icon || ""} />
          <FlexCol className="gap-2 max-w-48 text-start">
            <FlexCol className="gap-[2px]">
              <Typography type="bold3">{name}</Typography>
              <Typography type="regular1">{shortName}</Typography>
            </FlexCol>
            <FlexRow>
              {tags?.map((t, index) => {
                return <Tag tag={t} key={index} />;
              })}
            </FlexRow>
          </FlexCol>
        </FlexRow>
        <FlexCol className="gap-1 text-center items-center">
          <AssetApy asset={address} isStrategy={isStrategy} />
          {/* <Typography type="bold3">{apy}</Typography> */}
          {incentivesButton && incentivesButton}
        </FlexCol>
      </FlexRow>
    </div>
  );
};
