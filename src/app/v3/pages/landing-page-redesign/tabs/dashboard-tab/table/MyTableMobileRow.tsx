import { Address } from "viem";
import { FlexCol, FlexRow, Icon, Typography } from "@shared";
import { RandomNumber } from "../../../../../components/specific-components/RandomNumber";
import { TableButtons } from "./TableButtons";
import { useFullTokenData } from "../../../../../../statev3/common/meta-data-queries/useFullTokenData";
import { Tag } from "../../../../../components/asset-data/Tag";
import polygonSvg from "@assets/common/polygon.svg";
import { StrategyApr } from "../../../../../components/asset-data/AssetApr";

export const MyTableMobileRow: React.FC<{ strategy: Address }> = ({ strategy }) => {
  const {
    data: { logo: icon, name, description, tags },
  } = useFullTokenData(strategy);

  return (
    <div className="flex md:hidden flex-col bg-white shadow rounded-lg p-4 m-2">
      <FlexCol className="items-end mb-[-10px]">
        <FlexRow>{tags?.map((tag) => <Tag key={tag} tag={tag} />)}</FlexRow>
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
          <StrategyApr asset={strategy} isStrategy />
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
