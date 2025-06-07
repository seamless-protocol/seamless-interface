import { DisplayPercentage, FlexRow, FlexCol, Tooltip, Typography, ViewNumber } from "@shared";

interface ApyItem {
  label: string;
  value: ViewNumber;
}

interface ApyDetailCardProps {
  items: ApyItem[];
}

export const ApyDetailCard: React.FC<ApyDetailCardProps> = ({ items }) => {
  return (
    <FlexCol className="w-56 items-center gap-4 py-1">
      <Typography type="caption" className="text-left">
        Here is a breakdown of this position&apos;s annual percentage yields. Each line shows a component of the total
        APY.
      </Typography>

      <FlexCol className="gap-4 w-full">
        {items.map((item, idx) => (
          <FlexRow className="justify-between" key={idx}>
            <Typography type="medium2">{item.label}</Typography>
            <DisplayPercentage viewValue={item.value.viewValue} symbol={item.value.symbol} typography="bold2" />
          </FlexRow>
        ))}
      </FlexCol>
    </FlexCol>
  );
};

interface ApyButtonProps {
  items: ApyItem[];
  children: React.ReactNode;
  isLoading?: boolean;
  isFetched?: boolean;
  isError?: boolean;
  additionalElement?: React.ReactNode;
}

export const ApyButton: React.FC<ApyButtonProps> = ({
  items,
  children,
  isLoading = false,
  isFetched = true,
  isError,
  additionalElement,
}) => {
  if (isLoading || !isFetched) {
    return <span className="skeleton mt-[0.2px] flex w-20 h-6" />;
  }

  // If there are no items, render nothing
  if (!items.length) {
    return null;
  }

  const lastItem = items[items.length - 1];

  return (
    <div className="flex">
      <Tooltip tooltip={children} hidden={isError}>
        <FlexCol className="md:items-start items-end gap-1">
          <FlexRow className="bg-smallElements-rewardAPY items-center gap-2 border border-solid px-2 py-1.5 rounded-[100px] border-metallicBorder max-w-max">
            <DisplayPercentage
              viewValue={lastItem.value.viewValue}
              symbol={`${lastItem.value.symbol} APY`}
              typography="medium2"
              isError={isError}
            />
          </FlexRow>
          {additionalElement}
        </FlexCol>
      </Tooltip>
    </div>
  );
};
