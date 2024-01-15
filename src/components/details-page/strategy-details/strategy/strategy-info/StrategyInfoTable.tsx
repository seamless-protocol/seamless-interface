import { Divider, Stack } from "@mui/material";
import StrategyInfoTableBox from "./StrategyInfoTableBox";
import { useFetchStrategyInfo } from "../../../../../hooks/useFetchStrategyInfo";

function StrategyInfoTable() {
  const {
    collateral,
    collateralUSD,
    equity,
    equityUSD,
    currentMultiple,
    targetMultiple,
  } = useFetchStrategyInfo();

  return (
    <Stack
      direction={"row"}
      spacing={3}
      divider={<Divider orientation="vertical" variant="middle"></Divider>}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <StrategyInfoTableBox
        label={"Total market value"}
        primaryValue={collateral}
        secondaryValue={collateralUSD}
      />
      <StrategyInfoTableBox
        label={"Total supplied"}
        primaryValue={equity}
        secondaryValue={equityUSD}
      />
      <StrategyInfoTableBox
        label={"Current multiple"}
        primaryValue={currentMultiple}
      />
      <StrategyInfoTableBox
        label={"Target multiple"}
        primaryValue={targetMultiple}
      />
    </Stack>
  );
}

export default StrategyInfoTable;
