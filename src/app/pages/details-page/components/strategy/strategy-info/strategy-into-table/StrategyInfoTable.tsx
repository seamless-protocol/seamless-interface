import { Divider, Stack } from "@mui/material";
import StrategyInfoTableBox from "./StrategyInfoTableColumn";
import { useFetchViewStrategyInfo } from "../../../../../../state/loop-strategy/hooks/useFetchViewStrategyInfo";

function StrategyInfoTable() {
  const { isLoading, data } = useFetchViewStrategyInfo(0);

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
        isLoading={isLoading!}
        label={"Total market value"}
        primaryValue={data?.collateral.tokenAmount.value!}
        secondaryValue={data?.collateral.dollarAmount.value!}
      />
      <StrategyInfoTableBox
        isLoading={isLoading!}
        label={"Total supplied"}
        primaryValue={data?.equity.tokenAmount.value!}
        secondaryValue={data?.equity.dollarAmount.value!}
      />
      <StrategyInfoTableBox
        isLoading={isLoading!}
        label={"Current multiple"}
        primaryValue={data?.currentMultiple!}
      />
      <StrategyInfoTableBox
        isLoading={isLoading!}
        label={"Target multiple"}
        primaryValue={data?.targetMultiple!}
      />
    </Stack>
  );
}

export default StrategyInfoTable;
