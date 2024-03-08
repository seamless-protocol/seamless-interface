import { PropsWithChildren } from "react";
import {
  DisplayMoney,
  DisplayPercentage,
  DisplayText,
  DisplayTokenAmount,
  FlexCol,
  FlexRow,
  Icon,
} from "../../../../../shared";
import { Link } from "react-router-dom";
import { RouterConfig } from "../../../../router";
import { IncentivesButton } from "../desktop/IncentivesButton";
import { ViewBaseAsset } from "../../hooks/useFetchViewBaseAsset";

export const BaseAssetsMobileTableRow: React.FC<{
  index: number;
  columnNames: {
    c_1: string;
    c_2: string;
    c_3: string;
    c_4: string;
    c_5: string;
    c_6: string;
    c_6_1: string;
  };
  assets?: ViewBaseAsset;
  isLoading?: boolean;
}> = ({ assets, columnNames, isLoading, index }) => {
  return (
    <FlexCol className="md:hidden p-4 pb-6">
      <FlexRow className="justify-start items-start gap-3 text-start mb-4">
        <Icon
          isLoading={isLoading}
          src={assets?.depositAsset.logo}
          alt={assets?.depositAsset.name || "asset"}
        />

        <div className="min-h-14 w-full">
          <span className="skeleton w-full h-full" />
          <DisplayText
            typography="h4"
            text={assets?.depositAsset.name}
            isLoading={isLoading}
          />
          <DisplayText
            typography="subheader2"
            text={assets?.depositAsset.symbol}
            isLoading={isLoading}
          />
        </div>
      </FlexRow>

      <FlexCol className="gap-2">
        <FlexCol className="gap-4">
          <LocalMobileTableRow>
            <DisplayText
              typography="description"
              text={columnNames.c_2}
              isLoading={isLoading}
            />
            <FlexCol>
              <DisplayTokenAmount
                typography="secondary14"
                isLoading={isLoading}
                {...assets?.totalSupplied?.tokenAmount}
              />
              <DisplayMoney
                typography="secondary12"
                isLoading={isLoading}
                {...assets?.totalSupplied?.dollarAmount}
              />
            </FlexCol>
          </LocalMobileTableRow>
          <LocalMobileTableRow>
            <DisplayText
              typography="description"
              text={columnNames.c_3}
              isLoading={isLoading}
            />
            <FlexCol className="items-end">
              <DisplayPercentage
                typography="secondary14"
                {...assets?.supplyApy}
                isLoading={isLoading}
              />
              <IncentivesButton {...assets?.supplyIncentives} />
            </FlexCol>
          </LocalMobileTableRow>
          <LocalMobileTableRow>
            <DisplayText
              typography="description"
              text={columnNames.c_4}
              isLoading={isLoading}
            />
            <FlexCol>
              <DisplayTokenAmount
                typography="secondary14"
                isLoading={isLoading}
                {...assets?.totalBorrowed?.tokenAmount}
              />
              <DisplayMoney
                typography="secondary12"
                isLoading={isLoading}
                {...assets?.totalBorrowed?.dollarAmount}
              />
            </FlexCol>
          </LocalMobileTableRow>
          <LocalMobileTableRow>
            <DisplayText
              typography="description"
              text={columnNames.c_5}
              isLoading={isLoading}
            />
            <FlexCol className="items-end">
              <DisplayPercentage
                typography="secondary14"
                {...assets?.borrowApyVariable}
                isLoading={isLoading}
              />
              <IncentivesButton {...assets?.borrowVariableIncentives} />
            </FlexCol>
          </LocalMobileTableRow>
          <LocalMobileTableRow>
            <DisplayText
              typography="description"
              text={columnNames.c_6}
              isLoading={isLoading}
            />
            <DisplayPercentage
              typography="secondary14"
              {...assets?.borrowApyStable}
              isLoading={isLoading}
            />
          </LocalMobileTableRow>
        </FlexCol>
        <LocalMobileTableRow>
          <Link
            to={RouterConfig.Builder.assetDetails(index)}
            className="inline-flex flex-1 items-center justify-center relative box-border cursor-pointer select-none align-middle appearance-none no-underline min-w-[64px] border shadow-none rounded font-medium leading-6 text-sm text-white m-0 px-3 py-1.5 border-solid border-[#eaebef] outline-none transition-all duration-250 ease-in-out bg-background-surface tracking-[0.009375rem]"
          >
            Details
          </Link>
        </LocalMobileTableRow>
      </FlexCol>
    </FlexCol>
  );
};

const LocalMobileTableRow: React.FC<PropsWithChildren> = ({ children }) => {
  return <FlexRow className="justify-between items-center">{children}</FlexRow>;
};
