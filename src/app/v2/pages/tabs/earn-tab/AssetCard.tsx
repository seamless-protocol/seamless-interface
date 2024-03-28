import { FlexRow, FlexCol, TypographyV2, Icon } from "@shared";
import { TagType, Tag } from "./Tag";

export interface AssetCardProps {
  icon: string;
  hideBorder?: boolean;
  title: string;
  subTitle: string;
  tags?: TagType[];
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
}) => {
  return (
    <div
      className={`p-6 pr-8  ${hideBorder ? "" : "border-solid border-b border-b-navy-100"}
        ${isSelected ? "bg-neutral-100" : "bg-neutral-0"} cursor-pointer`}
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
