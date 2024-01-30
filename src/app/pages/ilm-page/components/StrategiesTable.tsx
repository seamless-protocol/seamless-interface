import { Card, SimpleTable } from "../../../../shared";
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
    <div className="flex flex-col xxl:items-center mt-[-46px]">
      <Card className="mx-2 lg:mx-10 xl:mx-24 xxl:w-[1440px]">
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
      </Card>
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
        hideBorder={index === ilmStrategies.length - 1}
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
