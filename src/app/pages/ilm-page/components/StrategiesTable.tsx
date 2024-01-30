import { SimpleTable } from "../../../../shared";
import { SearchInput } from "../../../components/temporary-components/SearchInput";
import { useFetchViewStrategy } from "../../../state/ILM/hooks/useFetchViewStrategies";
import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";
import { DesktopTableRow } from "./desktop/DesktopTableRow";
import { MobileTableRow } from "./mobile/MobileTableRow";

const columnNames = {
  c_1_depositAsset: "Deposit Asset",
  c_1_1_empty: "",
  c_2_strategyName: "Strategy name",
  c_3_targetMultiple: "Target Multiple",
  c_4_loopAPY: "Loop APY",
  c_5_availableToDeposit: "Available to Deposit",
  c_6_yourPosition: "Your Position",
  c_7_1: "#",
};

const columns = Object.keys(columnNames).map((key) => ({
  id: key,
  label: columnNames[key as keyof typeof columnNames],
}));

export const StrategiesTable: React.FC = () => {
  return (
    <div className="mt-[-46px] ">
      <div className="bg-white mx-2 lg:mx-10 xl:mx-24 transition-shadow duration-300 ease-in-out delay-[0ms] rounded shadow-[rgba(0,0,0,0.05)_0px_2px_1px,rgba(0,0,0,0.25)_0px_0px_1px] border mt-0 border-solid border-[rgb(234,235,239)]">
        <div className="pt-4">
          <SimpleTable
            columns={columns}
            bodyComponent={<TableBody />}
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

const TableBody: React.FC = () => {
  return (
    <>
      {ilmStrategies.map((_, index) => (
        <StrategiesTableRow index={index} key={index} />
      ))}
    </>
  );
};

const StrategiesTableRow: React.FC<{ index: number }> = ({ index }) => {
  const { data: strategy, isLoading, isFetched } = useFetchViewStrategy(index);

  return (
    <>
      <DesktopTableRow
        index={index}
        hideBorer={index === ilmStrategies.length - 1}
        strategy={strategy}
        isLoading={isLoading || !isFetched}
      />
      <MobileTableRow
        isLoading={isLoading || !isFetched}
        columnNames={columnNames}
        strategy={strategy}
      />
    </>
  );
};
