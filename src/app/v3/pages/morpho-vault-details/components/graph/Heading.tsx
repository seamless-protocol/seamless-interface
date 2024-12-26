import { DisplayMoney, FlexCol, Typography } from "@shared";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchTotalSupply } from "../../hooks/TotalSupplyHistorical.hook";

export const Heading = () => {
  const { address } = useParams() as {
    address: Address;
  };

  const { data, ...rest } = useFetchTotalSupply(address);
  return (
    <FlexCol className="gap-2">
      <Typography type="bold4">Total supply</Typography>
      <DisplayMoney
        typography="bold7"
        viewValue={data?.totalSupply.viewValue}
        isLoading={rest.isLoading}
        errorMessage={rest.error?.message}
      />
    </FlexCol>
  );
};
