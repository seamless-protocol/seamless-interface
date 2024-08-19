import { Address } from "viem";
import { FlexRow, FlexCol, Icon, Typography } from "@shared";
import polygonSvg from "@assets/common/polygon.svg";
import { RandomNumber } from "../../../../../components/other/RandomNumber";

import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import { stateMock } from "../../../mocks";
import { Tag } from "../../../../../components/strategy-data/Tag";
import { TagType } from "../../../../../../statev3/common/types/StateTypes";

export const ILMMobileTableRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy }) => {
  // todo use useFullTokenData instead of mock
  const strategyMock = stateMock.data.find((s) => s.address === strategy);
  const name = strategyMock?.name;
  const description = strategyMock?.description;
  const icon = ilmIcon;
  const tag = "Staking" as TagType;

  return (
    <div className="flex md:hidden flex-col bg-white shadow rounded-lg p-4 m-2">
      <FlexCol className="items-end mb-[-10px]">
        <FlexRow>
          <Tag key={tag} tag={tag} />
        </FlexRow>
      </FlexCol>
      <FlexRow className="items-center mb-4">
        <FlexRow className="gap-4 items-center">
          <Icon width={40} src={icon} alt="logo" />
          <FlexCol className="gap-1 text-start">
            <Typography type="bold3">{name}</Typography>
            <Typography type="regular1">{description}</Typography>
          </FlexCol>
        </FlexRow>
      </FlexRow>

      <FlexRow className="justify-between">
        <FlexCol className="gap-2">
          <RandomNumber typography="bold3" symbol="%" symbolPosition="after" />
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
            <RandomNumber typography="bold3" symbol="$" />
          </FlexRow>
        </FlexCol>
      </FlexRow>
    </div>
  );
};
