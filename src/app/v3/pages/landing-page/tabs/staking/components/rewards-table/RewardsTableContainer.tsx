import { TableRow, TableCell, Typography } from "@shared";
import { EmptyTableGuard, NoRewardsDefaultTableBody } from "../../../../../common/components/EmptyTableGuard";
import { RewardRowDesktop } from "./RewardRow";
import { useFetchAssetRewardsData } from "../../../../../../../data/safetyModule/hooks/asset-rewards-data/FetchAssetRewardsData.hook";

export const RewardsTableContainer = () => {
  const { data, ...rest } = useFetchAssetRewardsData();

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-2xl">
        <TableRow className="grid grid-cols-12 py-2 max-h-9 bg-neutral-0 border-solid border-b border-b-navy-100 mt-0 justify-center rounded-t-2xl">
          <TableCell className="col-span-2 justify-center" alignItems="items-start">
            <Typography type="bold1">Rewards</Typography>
          </TableCell>
          <TableCell className="col-span-4 md:col-span-5">
            <Typography type="bold1">Name</Typography>
          </TableCell>
          <TableCell className="col-span-3">
            <Typography type="bold1">Symbol</Typography>
          </TableCell>
          <TableCell className="col-span-3 md:col-span-2">
            <Typography type="bold1">APR</Typography>
          </TableCell>
        </TableRow>

        <EmptyTableGuard
          numberOfStrategiesDisplayable={{
            ...rest,
            data: data?.rewardTokens?.length || 0,
          }}
          noPositionsBody={<NoRewardsDefaultTableBody />}
        >
          {data?.rewardTokens?.map((reward, index) => (
            <div key={`reward-${index}`}>
              <RewardRowDesktop
                rewardToken={{
                  data: reward,
                  ...rest,
                }}
                hideBorder={index === data.rewardTokens.length - 1}
              />
            </div>
          ))}
        </EmptyTableGuard>
      </div>
    </div>
  );
};
