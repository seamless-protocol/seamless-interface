import { Displayable, FlexRow, FlexCol, TableCell, TableRow, Icon, DisplayText, DisplayPercentage } from "@shared";
import { RewardToken } from "../../../../../../../../shared/utils/aaveIncentivesHelpers";

export const RewardRowDesktop: React.FC<{
  rewardToken: Displayable<RewardToken>;
  hideBorder?: boolean;
}> = ({ rewardToken, hideBorder }) => {
  return (
    <TableRow
      className={`grid grid-cols-11 items-center border-solid min-h-[89px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableCell alignItems="items-start col-span-5 pr-6">
        <FlexRow className="gap-4 items-center max-w-full">
          <Icon isLoading={rewardToken.isLoading} width={32} src={rewardToken.data.logo || ""} alt="logo" />
          <FlexCol className="gap-2 text-start max-w-full">
            <DisplayText
              typography="bold3"
              className="gap-[2px] max-w-full"
              viewValue={rewardToken.data.symbol}
              {...rewardToken}
            />
          </FlexCol>
        </FlexRow>
      </TableCell>

      <TableCell className="col-span-3">
        <DisplayPercentage typography="bold3" viewValue={rewardToken?.data.apr.viewValue} {...rewardToken} />
      </TableCell>
      <TableCell className="col-span-3">
        {/* <DisplayTokenAmount typography="bold3" viewValue={rewardToken?.} {...rewardToken} /> */}
      </TableCell>
    </TableRow>
  );
};
