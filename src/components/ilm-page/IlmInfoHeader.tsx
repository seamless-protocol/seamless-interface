import { useFetchInfoPanel } from "../../hooks/useFetchInfoPanel";
import HeaderContainer from "../common/HeaderContainer";
import HeaderInfoStack from "../common/header-info-stack/HeaderInfoStack";

function IlmInfoHeader() {
  const { equity, collateral, debt } = useFetchInfoPanel();

  return (
    <HeaderContainer>
      <HeaderInfoStack
        values={[
          { label: "Equity", value: `${equity}` },
          { label: "Collateral", value: `${collateral}` },
          { label: "Debt", value: `$${debt}` },
        ]}
      ></HeaderInfoStack>
    </HeaderContainer>
  );
}

export default IlmInfoHeader;
