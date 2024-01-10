import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFetchStrategyInfo } from "../../hooks/useFetchStrategyInfo";
import AssetColumnHeader from "./table-headers/AssetColumnHeader";
import CommonColumnHeader from "./table-headers/CommonColumnHeader";
import AssetCell from "./table-cells/AssetCell";
import TextCell from "./table-cells/TextCell";
import NumericCell from "./table-cells/NumericCell";
import ButtonLinkCell from "./table-cells/ButtonLinkCell";

function Strategies() {
  const { targetMultiple, maxMultiple, userEquity, userEquityUSD } =
    useFetchStrategyInfo();

  return (
    <TableContainer
      sx={{
        marginTop: "50px",
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <AssetColumnHeader label="Deposit asset" sx={{ width: "180px" }} />
            <CommonColumnHeader label="Description" sx={{ width: "150px" }} />
            <CommonColumnHeader label="Target multiple" />
            <CommonColumnHeader label="Max multiple" />
            <CommonColumnHeader label="Loop APY" />
            <CommonColumnHeader label="Your position" />
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <AssetCell name="Coinbase ETH" symbol="cbETH" image="cbeth.svg" />
            <TextCell text="cbETH/ETH strategy description" />
            <NumericCell primaryNumber={targetMultiple} />
            <NumericCell primaryNumber={maxMultiple} />
            <NumericCell primaryNumber="6.57%" />
            <NumericCell
              primaryNumber={userEquity}
              secondaryNumber={userEquityUSD}
            />
            <ButtonLinkCell label="Details" route="/details" />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Strategies;
