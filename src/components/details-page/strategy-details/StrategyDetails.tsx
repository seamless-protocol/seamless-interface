import StrategyDetailsContainer from "./StrategyDetailsContainer";
import Strategy from "./strategy/Strategy";
import UserInfo from "./user-info/UserInfo";

function StrategyDetails() {
  return (
    <StrategyDetailsContainer>
      <Strategy />
      <UserInfo />
    </StrategyDetailsContainer>
  );
}

export default StrategyDetails;
