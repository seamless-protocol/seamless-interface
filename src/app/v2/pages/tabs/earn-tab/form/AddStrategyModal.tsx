import { FlexCol, FlexRow, Icon, Modal, Typography, useFullTokenData } from "@shared";

import { sWETH_ADDRESS } from "@meta";

export const AddStrategyModal = () => {
  const { data: tokenData } = useFullTokenData(sWETH_ADDRESS);
  return (
    <Modal
      size="normal"
      buttonProps={{
        children: "Add to strategy",
        className: "text-bold3 bg-metalic text-neutral-0 rounded-[100px] py-4 px-32 items-center text-center",
      }}
      headerComponent={
        <FlexCol className="gap-1">
          <Typography type="bold4">Add to strategy</Typography>
          <Typography type="regular3">Multiply wstETH staking rewards</Typography>
        </FlexCol>
      }
    >
      <FlexCol className="gap-8">
        <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
          <Typography type="bold3">Overview</Typography>

          <LocalRow label="Action">Deposit</LocalRow>
          <LocalRow label="Strategy">Multiply wstETH staking rewards</LocalRow>
          <LocalRow label="Multiplier">5x</LocalRow>
          <LocalRow label="Starting Asset">wstETH</LocalRow>
          <LocalRow label="Deposit Size">
            <FlexRow className="gap-2 items-center">
              0.1 wstETH <Icon src={tokenData?.logo} alt={tokenData?.symbol || ""} width={16} />
            </FlexRow>
          </LocalRow>
          <LocalRow label="Ending Asset">wstETH</LocalRow>
          <LocalRow label="Network Fee">0.0054 ETH</LocalRow>
          <LocalRow label="Est. time to break even">3 days</LocalRow>
        </FlexCol>
        <button className="text-bold3 w-full bg-metalic text-neutral-0 rounded-[100px] py-4 px-32 items-center text-center">
          Confirm
        </button>
      </FlexCol>
    </Modal>
  );
};

const LocalRow: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <FlexRow className="text-navy-600 justify-between">
      <Typography type="bold2">{label}</Typography>
      <Typography type="medium2" className="text-navy-1000">
        {children}
      </Typography>
    </FlexRow>
  );
};
