import { Card, SimpleTable } from "../../../../shared";
import { SearchInput } from "../../../components/temporary-components/SearchInput";
import { lendingAssets } from "../../../state/lending-borrowing/config/AssetsConfig";
import { useFetchViewAssetMarketInfo } from "../../../state/lending-borrowing/hooks/useFetchViewAssetMarketInfo";
import { AssetsMarketDesktopTableRow } from "./desktop/AssetsMarketDesktopTableRow";
import { DesktopTableRow } from "./desktop/DesktopTableRow";
import { MobileTableRow } from "./mobile/MobileTableRow";

const columnNames = {
  c_1_depositAsset: "Deposit Asset",
  // c_1_1_empty: "",
  c_2_strategyName: "Total supplied",
  c_3_supplyApy: "Supply APY",
  c_4_targetMultiple: "Total borrowed",
  c_5_borrowApy: "Borrow APY,variable",
  c_6_borrowApy: "Borrow APY,stable",
  // c_6_availableToDeposit: "Available to Deposit",
  c_6_1: "#",
};

const columns = Object.keys(columnNames).map((key) => ({
  id: key,
  label: columnNames[key as keyof typeof columnNames],
}));

export const AssetsMarketTable: React.FC = () => {
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
      {lendingAssets.map((_, index) => (
        <AssetsMarketTableRow index={index} key={index} />
      ))}
    </>
  );
};

const AssetsMarketTableRow: React.FC<{ index: number }> = ({ index }) => {
  const {
    data: assets,
    isLoading,
    isFetched,
  } = useFetchViewAssetMarketInfo(index);

  return (
    <>
      <AssetsMarketDesktopTableRow
        index={index}
        hideBorder={index === lendingAssets.length - 1}
        strategy={assets}
        isLoading={isLoading || !isFetched}
      />
      {/* <MobileTableRow */}
      {/* index={index} */}
      {/* isLoading={isLoading || !isFetched} */}
      {/* columnNames={columnNames} */}
      {/* strategy={assets} */}
      {/* /> */}
    </>
  );
};
