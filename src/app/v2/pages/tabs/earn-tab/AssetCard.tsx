import { FlexRow, FlexCol, TypographyV2, Icon } from "@shared";
import { TagType, Tag } from "./Tag";

export type AssetType = "LEND" | "ILM";

export interface AssetCardProps {
  icon: string;
  hideBorder?: boolean;
  title: string;
  subTitle: string;
  tags?: TagType[];
  type?: AssetType;
  apy?: string;
  incentivesButton?: React.ReactNode;
  isSelected?: boolean;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  icon,
  hideBorder,
  title,
  subTitle,
  tags,
  apy,
  incentivesButton,
  isSelected,
  type = "LEND",
}) => {
  return (
    <div
      className={`p-6 pr-8 ${type === "LEND" ? "bg-neutral-0" : "bg-neutral-100"} ${hideBorder ? "" : "border-solid border-b border-b-navy-100"}
        ${isSelected ? "bg-blue-400" : ""} cursor-pointer`}
    >
      <FlexRow className="gap-10 justify-between">
        <FlexRow className="gap-4 items-start">
          <Icon width={40} src={icon} alt={icon} />
          <FlexCol className="gap-2 max-w-48">
            <FlexCol className="gap-[2px]">
              <TypographyV2 type="bold3">{title}</TypographyV2>
              <TypographyV2 type="regular1">{subTitle}</TypographyV2>
            </FlexCol>
            <FlexRow>
              {tags?.map((t, index) => {
                return <Tag tag={t} key={index} />;
              })}
            </FlexRow>
          </FlexCol>
        </FlexRow>
        <FlexCol className="gap-1 text-center items-center">
          <TypographyV2 type="bold3">{apy}</TypographyV2>
          {incentivesButton && incentivesButton}
        </FlexCol>
      </FlexRow>
    </div>
  );
};
