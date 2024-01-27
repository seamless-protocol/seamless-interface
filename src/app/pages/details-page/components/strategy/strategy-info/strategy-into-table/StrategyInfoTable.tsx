import { Divider, Stack } from "@mui/material";
import StrategyInfoTableBox from "./StrategyInfoTableColumn";
import { useFetchStrategyInfo } from "../../../../../../state/LoopStrategy/hooks/useFetchStrategyInfo";

function StrategyInfoTable() {
  const {
    isLoading,
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
        isLoading={isLoading}
        label={"Total market value"}
        primaryValue={collateral}
        secondaryValue={collateralUSD}
      />
      <StrategyInfoTableBox
        isLoading={isLoading}
        label={"Total supplied"}
        primaryValue={equity}
        secondaryValue={equityUSD}
      />
      <StrategyInfoTableBox
        isLoading={isLoading}
        label={"Current multiple"}
        primaryValue={currentMultiple}
      />
      <StrategyInfoTableBox
        isLoading={isLoading}
        label={"Target multiple"}
        primaryValue={targetMultiple}
      />
    </Stack>
  );
}

export default StrategyInfoTable;
