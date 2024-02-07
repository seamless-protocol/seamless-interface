import { Card, SimpleTable } from "../../../../shared";
import { SearchInput } from "../../../components/temporary-components/SearchInput";
import { lendingAssets } from "../../../state/lending-borrowing/config/AssetsConfig";
import { useFetchViewAssetMarketInfo } from "../../../state/lending-borrowing/hooks/useFetchViewAssetMarketInfo";
import { AssetsMarketDesktopTableRow } from "./desktop/AssetsMarketDesktopTableRow";
import { AssetsMobileTableRow } from "./mobile/AssetsMobileTableRow";

const columnNames = {
  c_1: "Deposit Asset",
  c_2: "Total supplied",
  c_3: "Supply APY",
  c_4: "Total borrowed",
  c_5: "Borrow APY,variable",
  c_6: "Borrow APY,stable",
  c_6_1: "#",
};

const columns = Object.keys(columnNames).map((key) => ({
  id: key,
  label: columnNames[key as keyof typeof columnNames],
}));

export const AssetsMarketTable: React.FC = () => {
  return (
    <div className="flex flex-col xxl:items-center">
      <Card className="mx-2 lg:mx-10 xl:mx-24 xxl:w-[1440px]">
        <div className="pt-4">
          <SimpleTable
            columns={columns}
            bodyComponent={<TableBody />}
            title="Base assets"
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
      <AssetsMobileTableRow
        index={index}
        isLoading={isLoading || !isFetched}
        columnNames={columnNames}
        strategy={assets}
      />
    </>
  );
};
