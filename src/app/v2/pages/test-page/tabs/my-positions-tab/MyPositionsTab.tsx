import { MyStrategiesDesktopTableRow } from "./MyStrategiesDesktopTableRow";
import { useFetchUserStrategies } from "../../../../../state/lending-borrowing/hooks/useFetchUserStrategies";
import { Buttonv2, FlexRow, TableCell, TableRow, Typography } from "../../../../../../shared";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const MyPositionsTab: React.FC = () => {
  const { isConnected } = useAccount();
  const { data: strategies } = useFetchUserStrategies();

  if (!isConnected) {
    return (
      <FlexRow className="gap-4 items-center">
        <Typography type="bold4">Please connect you wallet...</Typography>
        <ConnectButton.Custom>
          {({ openConnectModal }) => {
            return (
              <Buttonv2 onClick={openConnectModal} className="text-bold2">
                Connect wallet
              </Buttonv2>
            );
          }}
        </ConnectButton.Custom>
      </FlexRow>
    );
  }

  if (!strategies || strategies?.length === 0) {
    return <Typography type="bold4">You don&apos;t have any positions at the moment.</Typography>;
  }

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-2xl">
        <div className="flex h-20 px-6 items-center">
          <Typography type="bold4">My earn positions</Typography>
        </div>
        <TableRow className="grid grid-cols-12 bg-neutral-100 border-solid border-b border-b-navy-100 mt-0 py-0.5 max-h-7 justify-center">
          <TableCell className="col-span-4 justify-center" alignItems="items-start">
            <Typography type="bold2">Strategy</Typography>
          </TableCell>
          <TableCell className="col-span-2">
            <Typography type="bold2">Current balance</Typography>
          </TableCell>
          <TableCell className="col-span-2">
            <Typography type="bold2">APY</Typography>
          </TableCell>
          <TableCell className="col-span-1">
            <Typography type="bold2">Collateral</Typography>
          </TableCell>
          <TableCell className="text-sm font-medium text-gray-500 col-span-3 h-1" />
        </TableRow>

        {strategies?.map((strategy, index) => (
          <div key={index}>
            <MyStrategiesDesktopTableRow {...strategy} hideBorder={index !== strategies.length} />
          </div>
        ))}
      </div>
    </div>
  );
};
