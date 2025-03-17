import { TableRow, TableCell, Typography } from "@shared";
import { useFetchViewAllUserRewards } from "../../../../../../../state/lending-borrowing/hooks/useFetchViewAllRewards";
import { EmptyTableGuard, NoRewardsDefaultTableBody } from "../../../../../common/components/EmptyTableGuard";
import { RewardRowDesktop } from "./RewardRow";

export const RewardsTableContainer = () => {
  const { data, ...rest } = useFetchViewAllUserRewards();

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-2xl">
        <TableRow className="grid grid-cols-11 py-2 max-h-9 bg-neutral-0 border-solid border-b border-b-navy-100 mt-0 justify-center rounded-t-2xl">
          <TableCell className="col-span-5 justify-center" alignItems="items-start">
            <Typography type="bold1">Rewards</Typography>
          </TableCell>
          <TableCell className="col-span-3">
            <Typography type="bold1">Dollar Value</Typography>
          </TableCell>
          <TableCell className="col-span-3">
            <Typography type="bold1">Token Amount</Typography>
          </TableCell>
        </TableRow>

        <EmptyTableGuard
          numberOfStrategiesDisplayable={{
            ...rest,
            data: data.rewards?.length || 0,
          }}
          noPositionsBody={<NoRewardsDefaultTableBody />}
        >
          {data?.rewards?.map((reward, index) => (
            <div key={`reward-${index}`}>
              <RewardRowDesktop
                rewardToken={{
                  data: reward,
                  ...rest,
                }}
              />
            </div>
          ))}
        </EmptyTableGuard>
      </div>
    </div>
  );
};
