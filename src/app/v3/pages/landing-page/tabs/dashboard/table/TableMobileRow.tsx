import { Address } from "viem";
import { FlexCol, FlexRow, Icon, Typography } from "@shared";
import { TableButtons } from "./TableButtons";
import { RandomNumber } from "../../../../../components/other/RandomNumber";
import { Tag } from "../../../../../components/strategy-data/Tag";
import { stateMock } from "../../../mocks";

import polygonSvg from "@assets/common/polygon.svg";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";

export const TableMobileRow: React.FC<{ strategy: Address }> = ({ strategy }) => {
  // todo use useFullTokenData instead of mock
  const strategyMock = stateMock.data.find((s) => s.address === strategy);
  const name = strategyMock?.name;
  const description = strategyMock?.description;
  const icon = ilmIcon;

  return (
    <div className="flex md:hidden flex-col bg-white shadow rounded-lg p-4 m-2">
      <FlexCol className="items-end mb-[-10px]">
        <div>
          <Tag tag="Staking" />
        </div>
      </FlexCol>

      <FlexRow className="items-center gap-4 mb-4">
        <Icon width={30} src={icon} alt="Strategy Logo" />
        <FlexCol>
          <Typography type="bold3">{name}</Typography>
          <Typography type="regular1">{description}</Typography>
        </FlexCol>
      </FlexRow>
      <FlexRow className="justify-between">
        <FlexCol className="gap-2">
          <RandomNumber typography="bold3" className="" symbol="%" symbolPosition="after" />
        </FlexCol>

        <FlexCol className="items-end text-end gap-2">
          <FlexRow className="items-center gap-1">
            <Typography type="regular1">30d historical return: </Typography>
            <FlexRow className="items-center gap-1">
              <Icon src={polygonSvg} alt="polygon" width={12} height={12} />
              <RandomNumber typography="bold3" className="text-successv2-900" symbol="%" symbolPosition="after" />
            </FlexRow>
          </FlexRow>
          <FlexRow className="items-center gap-1">
            <Typography type="regular1">TVL: </Typography>
            <RandomNumber typography="bold3" className="" symbol="%" symbolPosition="after" />
          </FlexRow>
        </FlexCol>
      </FlexRow>

      <FlexRow className="justify-between">
        <TableButtons isStrategy strategy={strategy} />
      </FlexRow>
    </div>
  );
};
