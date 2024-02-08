import { PropsWithChildren } from "react";
import {
  DisplayMoney,
  DisplayPercentage,
  DisplayText,
  DisplayTokenAmount,
  Divider,
  FlexCol,
  FlexRow,
  Icon,
} from "../../../../../shared";
import { ViewStrategy } from "../../../../state/ILM/types/ViewStrategy";
import { Link } from "react-router-dom";
import { RouterConfig } from "../../../../router";

export const StrategiesMobileTableRow: React.FC<{
  index: number;
  columnNames: {
    c_1_depositAsset: string;
    c_2_strategyName: string;
    c_3_targetMultiple: string;
    c_4_loopAPY: string;
    c_5_availableToDeposit: string;
    c_6_yourPosition: string;
    c_7_1: string;
  };
  strategy?: ViewStrategy;
  isLoading?: boolean;
}> = ({ strategy, columnNames, isLoading, index }) => {
  return (
    <FlexCol className="md:hidden p-4 pb-6">
      <FlexRow className="justify-start items-start gap-3 text-start mb-4">
        <Icon
          isLoading={isLoading}
          src={strategy?.depositAsset.logo}
          alt={strategy?.depositAsset.name || "asset"}
        />

        <div className="min-h-14 w-full">
          <span className="skeleton w-full h-full" />
          <DisplayText
            typography="h4"
            text={strategy?.depositAsset.name}
            isLoading={isLoading}
          />
          <DisplayText
            typography="subheader2"
            text={strategy?.depositAsset.description}
            isLoading={isLoading}
          />
        </div>
      </FlexRow>

      <FlexCol className="gap-2">
        <FlexCol className="gap-4">
          <LocalMobileTableRow>
            <DisplayText
              typography="description"
              text={columnNames.c_2_strategyName}
              isLoading={isLoading}
            />
            <DisplayText
              typography="secondary14"
              text={strategy?.strategyName}
              isLoading={isLoading}
            />
          </LocalMobileTableRow>
          <LocalMobileTableRow>
            <DisplayText
              typography="description"
              text={columnNames.c_3_targetMultiple}
              isLoading={isLoading}
            />
            <DisplayText
              typography="main16"
              text={strategy?.targetMultiple}
              isLoading={isLoading}
            />
          </LocalMobileTableRow>
          <LocalMobileTableRow>
            <DisplayText
              typography="description"
              text={columnNames.c_4_loopAPY}
              isLoading={isLoading}
            />
            <DisplayPercentage
              typography="secondary14"
              {...strategy?.LoopAPY}
              isLoading={isLoading}
            />
          </LocalMobileTableRow>
        </FlexCol>
        <Divider />
        <LocalMobileTableRow>
          <DisplayText
            typography="description"
            text={columnNames.c_5_availableToDeposit}
            isLoading={isLoading}
          />
          <FlexCol>
            <DisplayTokenAmount
              typography="secondary14"
              isLoading={isLoading}
              {...strategy?.availableToDeposit?.tokenAmount}
            />
            <DisplayMoney
              typography="secondary12"
              isLoading={isLoading}
              {...strategy?.availableToDeposit?.dollarAmount}
            />
          </FlexCol>
        </LocalMobileTableRow>
        <LocalMobileTableRow>
          <DisplayText
            typography="description"
            text={columnNames.c_6_yourPosition}
            isLoading={isLoading}
          />
          <FlexCol>
            <DisplayTokenAmount
              typography="secondary14"
              isLoading={isLoading}
              {...strategy?.yourPosition?.tokenAmount}
            />
            <DisplayMoney
              typography="secondary12"
              isLoading={isLoading}
              {...strategy?.yourPosition?.dollarAmount}
            />
          </FlexCol>
        </LocalMobileTableRow>
        <LocalMobileTableRow>
          <Link
            to={RouterConfig.Builder.ilmDetails(index)}
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
