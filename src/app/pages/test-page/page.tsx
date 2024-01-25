import { DisplayMoney, FlexCol, FlexRow, Typography } from "../../../shared";
import { useFetchViewStrategies } from "../../state/ILMContract/hooks/useFetchStrategyAndUserInfo";
import { Table } from "./components/Table";

export const TestPage = () => {
  const displayableViewStrategies = useFetchViewStrategies();

  return (
    <div>
      <div className="bg-background-header">
        <div className="pt-12 pb-20">
          <div className="px-10">
            <div className="px-14">
              <FlexCol className="gap-4 text-text-primary">
                <FlexCol>
                  <Typography type="h1">Base Market</Typography>
                </FlexCol>
                <FlexRow className="gap-8">
                  <FlexCol>
                    <Typography type="description" color="light">
                      Total market size
                    </Typography>
                    <DisplayMoney
                      value="74.65M"
                      symbolColor="light"
                      loaderSkeleton
                      isLoading
                    />
                  </FlexCol>

                  <FlexCol>
                    <Typography type="description" color="light">
                      Total available
                    </Typography>
                    <DisplayMoney
                      typography="main21"
                      value="61.42M"
                      symbolColor="light"
                      loaderSkeleton
                    />
                  </FlexCol>

                  <FlexCol>
                    <Typography type="description" color="light">
                      Total borrows
                    </Typography>
                    <DisplayMoney
                      typography="main21"
                      value="12.78M"
                      loaderSkeleton
                    />
                  </FlexCol>
                </FlexRow>
              </FlexCol>
            </div>
          </div>
        </div>
      </div>
      <Table {...displayableViewStrategies} />
    </div>
  );
};
