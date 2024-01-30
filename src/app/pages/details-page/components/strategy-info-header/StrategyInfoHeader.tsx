import { Container } from "@mui/material";
import HeaderContainer from "../../../../components/header/HeaderContainer";
import HeaderInfoStack from "../../../../components/header/header-info-stack/HeaderInfoStack";
import AssetBox from "./AssetBox";
import { useFetchViewStrategyPageHeader } from "../../../../state/loop-strategy/hooks/useFetchViewStrategyPageHeader";

function StrategyInfoHeader() {
  const { isLoading, data } = useFetchViewStrategyPageHeader(0);

  return (
    <HeaderContainer>
      <Container sx={{ display: "flex" }}>
        <AssetBox />
        <HeaderInfoStack
          isLoading={isLoading as boolean}
          values={[
            { label: "Target multiple", value: data?.targetMultiple! },
            { label: "APY estimate", value: `3.97%` },
            { label: "Oracle price", value: `$${data?.oraclePrice.value}` },
          ]}
          sx={{ marginLeft: "20px" }}
        />
      </Container>
    </HeaderContainer>
  );
}

export default StrategyInfoHeader;
