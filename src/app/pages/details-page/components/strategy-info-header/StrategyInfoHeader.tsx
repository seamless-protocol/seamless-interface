import { Container } from "@mui/material";
import HeaderContainer from "../../../../components/header/HeaderContainer";
import HeaderInfoStack from "../../../../components/header/header-info-stack/HeaderInfoStack";
import AssetBox from "./AssetBox";
import { useFetchStrategyInfoHeader } from "../../../../state/LoopStrategy/hooks/useFetchStrategyInfoHeader";

function StrategyInfoHeader() {
  const { isLoading, targetMultiple, oraclePrice } =
    useFetchStrategyInfoHeader();

  return (
    <HeaderContainer>
      <Container sx={{ display: "flex" }}>
        <AssetBox />
        <HeaderInfoStack
          isLoading={isLoading}
          values={[
            { label: "Target multiple", value: `${targetMultiple}x` },
            { label: "APY estimate", value: `3.97%` },
            { label: "Oracle price", value: oraclePrice },
          ]}
          sx={{ marginLeft: "20px" }}
        />
      </Container>
    </HeaderContainer>
  );
}

export default StrategyInfoHeader;
