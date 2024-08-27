import { Address } from "viem";
import { FlexCol, FlexRow, Icon, ImageGroup, Typography } from "@shared";
import { TableButtons } from "./TableButtons";
import { RandomNumber } from "../../../../../components/other/RandomNumber";
import { Tag } from "../../../../../components/strategy-data/Tag";
import { stateMock } from "../../../mocks";

import polygonSvg from "@assets/common/polygon.svg";
import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import { assetLogos } from "../../../../../../../meta";

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
      <FlexCol className="gap-5">
        <FlexRow className="justify-between w-full">
          <FlexCol className="items-start">
            <Typography type="regular1">Unclaimed Rewards</Typography>
            <FlexCol>
              <RandomNumber symbol="$" />
              <ImageGroup
                imageStyle="w-4"
                spacing="-space-x-3"
                images={[assetLogos.get("SEAM") || "", assetLogos.get("USDC") || ""]}
              />
            </FlexCol>
          </FlexCol>
          <FlexCol className="items-end">
            <Typography type="regular1">Unrealized Gain/Loss</Typography>
            <FlexRow className="items-center gap-1">
              <Icon src={polygonSvg} alt="polygon" width={12} height={12} />
              <RandomNumber typography="bold3" className="text-success-900" symbol="%" symbolPosition="after" />
            </FlexRow>
            <RandomNumber typography="medium1" symbol="$" className="text-primary-600" />
          </FlexCol>
        </FlexRow>

        <FlexRow className="justify-between">
          <FlexCol>
            <Typography type="regular1">Holdings (LP token)</Typography>
            <RandomNumber typography="bold3" className="" symbol="%" symbolPosition="after" />
          </FlexCol>
          <TableButtons isStrategy strategy={strategy} />
        </FlexRow>
      </FlexCol>
    </div>
  );
};
