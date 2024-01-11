import { Divider } from "@mui/material";
import StrategyContainer from "./StrategyContainer";
import StrategyDescription from "./StrategyDescription";
import StrategyHeader from "./StrategyHeader";
import StrategyInfo from "./strategy-info/StrategyInfo";
import StrategyImage from "./StrategyImage";

function Strategy() {
  return (
    <StrategyContainer>
      <StrategyHeader />
      <StrategyInfo sx={{ marginTop: "30px", marginBottom: "40px" }} />
      <Divider variant="middle" sx={{ marginBottom: "40px" }} />

      <StrategyDescription />
      <Divider
        variant="middle"
        sx={{ marginBottom: "40px", marginTop: "40px" }}
      />

      <StrategyImage />
    </StrategyContainer>
  );
}

export default Strategy;
