import { Container } from "@mui/material";
import HeaderContainer from "../../common/HeaderContainer";
import HeaderInfoStack from "../../common/header-info-stack/HeaderInfoStack";
import AssetBox from "./AssetBox";
import { useFetchStrategyInfoHeader } from "../../../hooks/useFetchStrategyInfoHeader";

function StrategyInfoHeader() {
  const { targetMultiple, oraclePrice } = useFetchStrategyInfoHeader();

  return (
    <HeaderContainer>
      <Container sx={{ display: "flex" }}>
        <AssetBox />
        <HeaderInfoStack
          values={
            [
              { label: "Target multiple", value: `${targetMultiple}x` },
              { label: "APY estimate", value: `3.97%` },
              { label: "Oracle price", value: oraclePrice },
            ] as any
          }
          sx={{ marginLeft: "20px" }}
        />
      </Container>
    </HeaderContainer>
  );
}

export default StrategyInfoHeader;
