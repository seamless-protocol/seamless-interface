import {
  DisplayMoney,
  DisplayPercentage,
  DisplayTokenAmount,
  Displayable,
  FlexCol,
  FlexRow,
  Icon,
  Typography,
} from "../../../../shared";
import { SearchInput } from "./SearchInput";
import { TemporaryButton } from "./TemporaryButton";
import { ViewStrategy } from "../../../state/ILMContract/types/ViewStrategy";

export const Table: React.FC<Displayable<ViewStrategy[]>> = ({
  data,
  isFetched,
  isLoading,
}) => {
  // todo
  console.log({ isFetched });
  console.log({ isLoading });

  return (
    <div className="mt-[-46px] ">
      <div className="bg-white mx-24 transition-shadow duration-300 ease-in-out delay-[0ms] rounded shadow-[rgba(0,0,0,0.05)_0px_2px_1px,rgba(0,0,0,0.25)_0px_0px_1px] border mt-0 border-solid border-[rgb(234,235,239)]">
        <div className="py-4 px-6">
          <FlexRow className="p-1 justify-between">
            <Typography type="h2" color="secondary">
              Strategies
            </Typography>
            <SearchInput />
          </FlexRow>
          <div className="overflow-x-auto mt-4">
            <table className="table text-text-secondary">
              {/* head */}
              <thead className="text-text-secondary border-b-divider">
                <tr>
                  <th>
                    <Typography type="subheader2">Strategy name</Typography>
                  </th>
                  <th>
                    <Typography type="subheader2">Deposit asset</Typography>
                  </th>
                  <th>
                    <Typography type="subheader2">Target multiple</Typography>
                  </th>
                  <th>
                    <Typography type="subheader2">Loop APY</Typography>
                  </th>
                  <th>
                    <Typography type="subheader2">
                      Available to deposit
                    </Typography>
                  </th>
                  <th>
                    <Typography type="subheader2">Your position</Typography>
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-secondary border-t-divider">
                {data?.map((strategy, index) => (
                  <tr key={index} className="border-b-divider">
                    <th>
                      <Typography type="h4">{strategy.strategyName}</Typography>
                    </th>
                    <th>
                      <FlexRow className="gap-3">
                        <Icon
                          src="/favicon.svg"
                          alt={strategy.depositAsset.name || "asset"}
                        />
                        <FlexCol className="gap-[1px]">
                          <Typography type="h4">
                            {strategy.depositAsset.name}
                          </Typography>
                          <Typography type="subheader2">
                            {strategy.depositAsset.description}
                          </Typography>
                        </FlexCol>
                      </FlexRow>
                    </th>
                    <th>
                      <Typography type="main16">
                        {strategy.targetMultiple}
                      </Typography>
                    </th>
                    <th>
                      <DisplayPercentage
                        typography="main16"
                        {...strategy.LoopAPY}
                      />
                    </th>
                    <th>
                      <FlexCol className="gap-[1px]">
                        <DisplayTokenAmount
                          typography="main16"
                          {...strategy.availableToDeposit?.tokenAmount}
                        />
                        <DisplayMoney
                          typography="subheader2"
                          {...strategy.availableToDeposit?.dollarAmount}
                        />
                      </FlexCol>
                    </th>
                    <th>
                      <FlexCol className="gap-[1px]">
                        <DisplayTokenAmount
                          typography="main16"
                          {...strategy.yourPosition?.tokenAmount}
                        />
                        <DisplayMoney
                          typography="subheader2"
                          {...strategy.yourPosition?.dollarAmount}
                        />
                      </FlexCol>
                    </th>
                    <th>
                      <TemporaryButton />
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
