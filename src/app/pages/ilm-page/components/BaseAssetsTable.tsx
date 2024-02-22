import { Card, SimpleTable } from "../../../../shared";
import { SearchInput } from "../../../components/temporary-components/SearchInput";
import { baseAssets } from "../../../state/lending-borrowing/config/BaseAssetsConfig";
import { useFetchViewBaseAsset } from "../../../state/lending-borrowing/hooks/useFetchViewBaseAsset";
import { BaseAssetsDesktopTableRow } from "./desktop/BaseAssetsDesktopTableRow";
import { BaseAssetsMobileTableRow } from "./mobile/BaseAssetsMobileTableRow";

const columnNames = {
  c_1: "Deposit Asset",
  c_2: "Total supplied",
  c_3: "Supply APY",
  c_4: "Total borrowed",
  c_5: "Borrow APY,variable",
  c_6: "Borrow APY,stable",
  c_6_1: "",
};

const columns = Object.keys(columnNames).map((key) => ({
  id: key,
  label: columnNames[key as keyof typeof columnNames],
}));

export const BaseAssetsTable: React.FC = () => {
  return (
    <div className="flex flex-col xxl:items-center">
      <Card className="mx-2 lg:mx-10 xl:mx-24 xxl:w-[1440px]">
        <div className="pt-4">
          <SimpleTable
            columns={columns}
            bodyComponent={<TableBody />}
            title="Lending & Borrowing"
            subtitle="Choose from a wide range of assets to supply and borrow"
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
      {baseAssets.map((_, index) => (
        <BaseAssetsTableRow index={index} key={index} />
      ))}
    </>
  );
};

const BaseAssetsTableRow: React.FC<{ index: number }> = ({ index }) => {
  const { data: assets, isLoading, isFetched } = useFetchViewBaseAsset(index);

  return (
    <>
      <BaseAssetsDesktopTableRow
        index={index}
        hideBorder={index === baseAssets.length - 1}
        asset={assets}
        isLoading={isLoading || !isFetched}
      />
      <BaseAssetsMobileTableRow
        index={index}
        isLoading={isLoading || !isFetched}
        columnNames={columnNames}
        assets={assets}
      />
    </>
  );
};
