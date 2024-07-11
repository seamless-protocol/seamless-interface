import { FlexCol, FlexRow, Icon, Typography } from "@shared";
import { CurrentBalance } from "./CurrentBalance";
import { AssetApy } from "../../../../components/asset-data/AssetApy";
import { Address } from "viem";
import { Tag } from "../../../../components/asset-data/Tag";
import { AprTooltip } from "../../../../components/incentives/AprTooltip";
import { TableButtonsMobile } from "./TableButtonsMobile";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";

export const MyStrategiesMobileTableRow: React.FC<{
  asset: Address;
  strategy?: Address;
}> = ({ asset, strategy }) => {
  const isStrategy = !!strategy;
  const {
    data: { logo, name, subTitle },
  } = useFullTokenData(isStrategy ? strategy : asset);

  return (
    <div className="p-2">
      <FlexCol className="md:hidden p-3 bg-neutral-100 rounded-lg gap-1">
        <FlexRow className="justify-between items-start mb-4">
          <FlexCol className="gap-2 text-start">
            <FlexRow className="gap-2">
              <Icon width={40} src={logo} alt={logo || ""} />
              <FlexCol className="gap-1">
                <Typography type="bold3">{name}</Typography>
                <Typography type="regular1">{subTitle}</Typography>
              </FlexCol>
            </FlexRow>
          </FlexCol>
          <Tag tag={strategy ? "ILM" : "LEND"} />
        </FlexRow>
        <div className="grid grid-cols-3">
          <FlexCol className="col-span-2">
            <CurrentBalance asset={isStrategy ? strategy : asset} isStrategy={isStrategy} />
          </FlexCol>
          <FlexCol className="text-end items-end">
            <AssetApy asset={asset} subStrategy={strategy} isStrategy={isStrategy} typography="bold3" />
            <AprTooltip asset={asset} isStrategy={isStrategy} strategy={strategy} />
          </FlexCol>
        </div>
        <div className="mt-4">
          <TableButtonsMobile asset={asset} subStrategy={strategy} isStrategy={isStrategy} />
        </div>
      </FlexCol>
    </div>
  );
};
