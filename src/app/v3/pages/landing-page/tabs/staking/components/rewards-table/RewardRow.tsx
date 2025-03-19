import {
  Displayable,
  FlexRow,
  FlexCol,
  TableCell,
  TableRow,
  Icon,
  DisplayText,
  DisplayPercentage,
  RewardToken,
} from "@shared";

export const RewardRowDesktop: React.FC<{
  rewardToken: Displayable<RewardToken>;
  hideBorder?: boolean;
}> = ({ rewardToken, hideBorder }) => {
  return (
    <TableRow
      className={`grid grid-cols-12 items-center border-solid min-h-[89px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableCell alignItems="items-start col-span-2 pr-6">
        <FlexRow className="gap-4 items-center max-w-full">
          <Icon isLoading={rewardToken.isLoading} width={32} src={rewardToken.data.logo || ""} alt="logo" />
          <FlexCol className="gap-2 text-start max-w-full" />
        </FlexRow>
      </TableCell>

      <TableCell className="col-span-5">
        <DisplayText
          typography="bold3"
          className="gap-[2px] max-w-full"
          viewValue={rewardToken.data.name}
          {...rewardToken}
        />
      </TableCell>
      <TableCell className="col-span-3">
        <DisplayText
          typography="bold3"
          className="gap-[2px] max-w-full"
          viewValue={rewardToken.data.symbol}
          {...rewardToken}
        />
      </TableCell>
      <TableCell className="col-span-2">
        <DisplayPercentage typography="bold3" viewValue={rewardToken?.data.apr.viewValue} {...rewardToken} />
      </TableCell>
    </TableRow>
  );
};
