import { useFetchUserSupplyTokens } from "../../../state/lending-borrowing/hooks/useFetchUserSupplyTokens";
import { useFetchDetailUserReserveData } from "../../../state/lending-borrowing/hooks/useFetchViewDetailUserReserveData";

export const TestComponent = () => {
  const { data, isLoading, isFetched } = useFetchUserSupplyTokens();
  console.log(data);

  return (
    <>
      {data.map((item) => (
        <TestRow asset={item} />
      ))}
    </>
  );
};

const TestRow = ({ asset }: any) => {
  const { data, isLoading, isFetched } = useFetchDetailUserReserveData(asset);

  console.log("===============================================");
  if (isFetched) {
    console.log(data);
  }

  return <></>;
};
