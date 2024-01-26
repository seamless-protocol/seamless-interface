import { DisplayMoney, FlexCol, FlexRow, Typography } from "../../../shared";
import { StrategiesTable } from "./components/StrategiesTable";
import { useFetchViewStrategies } from "../../state/ILMContract/hooks/useFetchViewStrategies";
import { useFetchIlmHeaderInfo } from "../../state/ILMContract/hooks/useFetchIlmPageHeader";

export const IlmPage = () => {
  const { isLoading, data } = useFetchIlmHeaderInfo();
  const displayableViewStrategies = useFetchViewStrategies();

  return (
    <div>
      <div className="bg-background-header">
        <div className="pt-12 pb-20">
          <div className="px-10">
            <div className="px-14">
              <FlexCol className="gap-4 text-text-primary">
                <FlexCol>
                  <Typography type="h1">Integrated Liquidity Market</Typography>
                  <Typography type="description" color="light">
                    Simplify your flow with integrated borrowing strategies
                  </Typography>
                </FlexCol>
                <FlexRow className="gap-8">
                  <FlexCol className="min-h-14">
                    <Typography type="description" color="light">
                      Total market size
                    </Typography>
                    <DisplayMoney
                      typography="main21"
                      {...data.totalMarketSize}
                      symbolColor="light"
                      loaderSkeleton
                      isLoading={isLoading}
                    />
                  </FlexCol>
                </FlexRow>
              </FlexCol>
            </div>
          </div>
        </div>
      </div>
      <StrategiesTable {...displayableViewStrategies} />
    </div>
  );
};
