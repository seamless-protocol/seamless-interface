import { Address } from "viem";
import { ExternalLink, FlexRow } from "@shared";
import { getVaultSeamlessprotocolDiscourseGroupUrl, gitBookUrl, RouterConfig } from "@router";

export const LearnMore: React.FC<{
  vault?: Address;
}> = ({ vault }) => {
  const discourseGroupUrl = vault ? getVaultSeamlessprotocolDiscourseGroupUrl(vault) : undefined;

  if (!vault) {
    return <div>No strategy selected</div>;
  }
  return (
    <FlexRow className="items-center gap-2">
      {discourseGroupUrl && <ExternalLink url={RouterConfig.Builder.baseScanAddress(vault)}>BaseScan</ExternalLink>}
      <ExternalLink url={RouterConfig.Builder.baseScanAddress(vault)}>BaseScan</ExternalLink>
      <ExternalLink url={gitBookUrl}>GitBook</ExternalLink>
    </FlexRow>
  );
};
