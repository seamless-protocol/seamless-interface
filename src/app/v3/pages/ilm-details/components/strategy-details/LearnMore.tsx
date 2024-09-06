import { Address } from "viem";
import { VaultsLink } from "../../../../components/other/VaultsLink";
import { ExternalLink, FlexRow } from "@shared";
import { gitBookUrl, RouterConfig } from "@router";

export const LearnMore: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  if (!strategy) {
    return <div>No strategy selected</div>;
  }
  return (
    <FlexRow className="items-center gap-2">
      <VaultsLink asset={strategy} />
      <ExternalLink url={RouterConfig.Builder.baseScanAddress(strategy)}>BaseScan</ExternalLink>
      <ExternalLink url={gitBookUrl}>GitBook</ExternalLink>
    </FlexRow>
  );
};
