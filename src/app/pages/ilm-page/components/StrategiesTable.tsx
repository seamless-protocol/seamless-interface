import {
  DisplayMoney,
  DisplayPercentage,
  DisplayTokenAmount,
  FlexRow,
  Icon,
  SimpleTable,
  TableCell,
  TableRow,
  Typography,
} from "../../../../shared";
import { SearchInput } from "../../../components/temporary-components/SearchInput";
import { TemporaryButton } from "../../../components/temporary-components/TemporaryButton";
import { ViewStrategy } from "../../../state/ILM/types/ViewStrategy";
import { useFetchViewStrategies } from "../../../state/ILM/hooks/useFetchViewStrategies";

const columns = [
  { id: "strategyName", label: "Strategy Name" },
  { id: "depositAsset", label: "Deposit Asset" },
  { id: "targetMultiple", label: "Target Multiple" },
  { id: "loopAPY", label: "Loop APY" },
  { id: "availableToDeposit", label: "Available to Deposit" },
  { id: "yourPosition", label: "Your Position" },
];

export const StrategiesTable: React.FC = () => {
  const { isLoading, isFetched, data } = useFetchViewStrategies();

  return (
    <div className="mt-[-46px] ">
      <div className="bg-white mx-24 transition-shadow duration-300 ease-in-out delay-[0ms] rounded shadow-[rgba(0,0,0,0.05)_0px_2px_1px,rgba(0,0,0,0.25)_0px_0px_1px] border mt-0 border-solid border-[rgb(234,235,239)]">
        <div className="py-4">
          <SimpleTable
            isLoading={isLoading || !isFetched}
            columns={columns}
            bodyComponent={<TableBody data={data} />}
            title="Strategies"
            filterComponent={<SearchInput />}
            settings={{
              skeletonRowCount: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TableBody: React.FC<{
  data?: ViewStrategy[];
}> = ({ data }) => {
  if (!data) return undefined;

  return (
    <>
      {data?.map((strategy, index) => (
        <TableRow
          rest={{
            onClick: () => {
              window.alert("Clicked:" + index);
            },
          }}
          key={index}
          hideBorder={index === data.length - 1}
        >
          <TableCell>
            <Typography type="h4">{strategy.strategyName}</Typography>
          </TableCell>
          <TableCell>
            <div className="flex justify-center items-center w-full">
              <FlexRow className="gap-3">
                <Icon
                  src="/favicon.svg"
                  alt={strategy.depositAsset.name || "asset"}
                />
                <div className="text-left">
                  <Typography type="h4">
                    {strategy.depositAsset.name}
                  </Typography>
                  <Typography type="subheader2">
                    {strategy.depositAsset.description}
                  </Typography>
                </div>
              </FlexRow>
            </div>
          </TableCell>
          <TableCell>
            <Typography type="main16">{strategy.targetMultiple}</Typography>
          </TableCell>
          <TableCell>
            <DisplayPercentage typography="main16" {...strategy.LoopAPY} />
          </TableCell>
          <TableCell>
            <div>
              <DisplayTokenAmount
                typography="main16"
                {...strategy.availableToDeposit?.tokenAmount}
              />
              <DisplayMoney
                typography="subheader2"
                {...strategy.availableToDeposit?.dollarAmount}
              />
            </div>
          </TableCell>
          <TableCell>
            <div>
              <DisplayTokenAmount
                typography="main16"
                {...strategy.yourPosition?.tokenAmount}
              />
              <DisplayMoney
                typography="subheader2"
                {...strategy.yourPosition?.dollarAmount}
              />
            </div>
          </TableCell>
          <TableCell>
            <TemporaryButton />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
