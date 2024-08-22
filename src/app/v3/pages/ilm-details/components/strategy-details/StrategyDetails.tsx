import { FlexCol, Typography } from "@shared";
import { FeesInformation } from "./FeesInformation";
import { HowStrategyWorks } from "./HowStrategyWorks";
import { LearnMore } from "./LearnMore";
import { MainRisks } from "./MainRisks";

export const StrategyDetails = () => {
  return (
    <FlexCol className="w-full gap-8">
      <Typography type="bold5">Strategy details</Typography>
      <FlexCol className="w-full gap-4">
        <LocalCollapseArrow>
          <LocalCollapseTitle>How this strategy works</LocalCollapseTitle>
          <div className="collapse-content">
            <HowStrategyWorks />
          </div>
        </LocalCollapseArrow>

        <LocalCollapseArrow>
          <LocalCollapseTitle>What are main risks</LocalCollapseTitle>
          <div className="collapse-content">
            <MainRisks />
          </div>
        </LocalCollapseArrow>
        <LocalCollapseArrow>
          <LocalCollapseTitle>What fees are there for using this strategy?</LocalCollapseTitle>
          <div className="collapse-content">
            <FeesInformation />
          </div>
        </LocalCollapseArrow>
        <LocalCollapseArrow>
          <LocalCollapseTitle>Where can I learn more?</LocalCollapseTitle>
          <div className="collapse-content">
            <LearnMore />
          </div>
        </LocalCollapseArrow>
      </FlexCol>
    </FlexCol>
  );
};

const LocalCollapseArrow: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="collapse collapse-arrow join-item border bg-neutral-0">
      <input type="radio" name="my-accordion-4" />
      {children}
    </div>
  );
};

const LocalCollapseTitle: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="collapse-title">
      <Typography type="medium4">{children}</Typography>
    </div>
  );
};
