import React from "react";
import { FlexCol, FlexRow, Typography } from "@shared";
import { Address } from "viem";
import { Link } from "react-router-dom";
import { getVaultSeamlessprotocolDiscourseGroupUrl } from "@router";
import { LearnMore } from "../LearnMore";
import { LocalCollapseArrow } from "../../../../../components/details-section/DetailsCollapseArrow";
import { LocalCollapseTitle } from "../../../../../components/details-section/DetailsCollapseTitle";
import { useFetchFormattedFullVaultInfo } from "../../../../../../data/morpho/full-vault-info/FullVaultInfo.hook";
import { DisplayTextLocal } from "../common/DisplayTextLocal";

export const Seamless_ETH_VaultDetails: React.FC<{
  vault?: Address;
}> = ({ vault }) => {
  const { data, ...rest } = useFetchFormattedFullVaultInfo(vault);
  const { feePercentage } = data || {};

  return (
    <FlexCol className="w-full gap-8">
      <Typography type="bold5">Vault details</Typography>
      <FlexCol className="w-full gap-4">
        <LocalCollapseArrow>
          <LocalCollapseTitle>How does this vault work</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                The Seamless WETH Vault on Morpho is curated by Gauntlet. This vault focuses on optimizing yield and
                streamlining efficiencies across various blue-chip collateral markets. Dive deeper into Gauntlet&apos;s
                curation approach on the Seamless Governance Forum in{" "}
                <Link
                  className="underline"
                  to={getVaultSeamlessprotocolDiscourseGroupUrl(vault)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discourse
                </Link>
                .
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        <LocalCollapseArrow>
          <LocalCollapseTitle>What are the main risks?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <Typography type="regular3">
                As with other DeFi lending and borrowing protocols, risks can include bad debt accrual, liquidation
                risk, and smart contract vulnerabilities. Always conduct research and assess risks before using any DeFi
                product.
              </Typography>
            </div>
          </div>
        </LocalCollapseArrow>

        <LocalCollapseArrow>
          <LocalCollapseTitle>Are there fees for using this vault?</LocalCollapseTitle>
          <div className="collapse-content">
            <div>
              <FlexRow className="gap-1">
                <Typography type="regular3">
                  There is a <DisplayTextLocal text={`${feePercentage}%`} {...rest} /> performance fee on interest
                  collected from borrowers.
                </Typography>
              </FlexRow>
            </div>
          </div>
        </LocalCollapseArrow>
        <LocalCollapseArrow>
          <LocalCollapseTitle>Where can I learn more?</LocalCollapseTitle>
          <div className="collapse-content">
            <LearnMore vault={vault} />
          </div>
        </LocalCollapseArrow>
      </FlexCol>
    </FlexCol>
  );
};
