import { FlexRow, FlexCol, Typography, Icon } from "@shared";
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
              <Typography type="bold3">{title}</Typography>
              <Typography type="regular1">{subTitle}</Typography>
            </FlexCol>
            <FlexRow>
              {tags?.map((t, index) => {
                return <Tag tag={t} key={index} />;
              })}
            </FlexRow>
          </FlexCol>
        </FlexRow>
        <FlexCol className="gap-1 text-center items-center">
          <Typography type="bold3">{apy}</Typography>
          {incentivesButton && incentivesButton}
        </FlexCol>
      </FlexRow>
    </div>
  );
};
