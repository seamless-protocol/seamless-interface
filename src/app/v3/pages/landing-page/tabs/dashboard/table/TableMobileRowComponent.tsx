import { FlexCol, FlexRow, Typography } from "@shared";

export const TableMobileRowComponent: React.FC<{
  tag: React.ReactNode;
  logo: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  rewards: React.ReactNode;
  profit: React.ReactNode;
  holdingTokenAmount: React.ReactNode;
  holdingDollarAmount: React.ReactNode;
  buttons: React.ReactNode;
}> = ({ tag, logo, name, description, rewards, profit, holdingTokenAmount, holdingDollarAmount, buttons }) => {
  return (
    <div className="flex md:hidden flex-col bg-white shadow rounded-lg p-4 m-2">
      <FlexCol className="items-end mb-[-10px]">
        <div>{tag}</div>
      </FlexCol>

      <FlexRow className="items-center gap-4 mb-4">
        {logo}
        <FlexCol>
          {name}
          {description}
        </FlexCol>
      </FlexRow>
      <FlexCol className="gap-5">
        <FlexRow className="justify-between w-full">
          <FlexCol className="items-start">
            <Typography type="regular1">Unclaimed Rewards</Typography>
            {rewards}
          </FlexCol>
          <FlexCol className="items-end">
            <Typography type="regular1">Unrealized Gain/Loss</Typography>
            {profit}
          </FlexCol>
        </FlexRow>

        <FlexRow className="justify-between">
          <FlexCol>
            <Typography type="regular1">Holdings (LP token)</Typography>
            {holdingTokenAmount}
            {holdingDollarAmount}
          </FlexCol>
          {buttons}
        </FlexRow>
      </FlexCol>
    </div>
  );
};
