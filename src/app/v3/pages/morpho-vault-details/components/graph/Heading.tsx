import { DisplayMoney, DisplayTokenAmount, FlexCol, Typography } from "@shared";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchTotalSupply } from "../../hooks/TotalSupplyHistorical.hook";

export const Heading: React.FC<{ showPriceInUsd?: boolean }> = ({ showPriceInUsd }) => {
  const { address } = useParams() as {
    address: Address;
  };

  const { data, ...rest } = useFetchTotalSupply(address);

  const { totalSupply, totalSupplyUsd } = data || {};

  return (
    <FlexCol className="gap-2">
      <Typography type="bold4">Total supply</Typography>
      {showPriceInUsd ? (
        <DisplayMoney
          typography="bold7"
          {...totalSupplyUsd}
          isLoading={rest.isLoading}
          errorMessage={rest.error?.message}
        />
      ) : (
        <DisplayTokenAmount
          typography="bold7"
          {...totalSupply}
          isLoading={rest.isLoading}
          errorMessage={rest.error?.message}
        />
      )}
    </FlexCol>
  );
};
