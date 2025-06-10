import { Typography, ExternalLink } from "@shared";
import { Address } from "viem";
import { getLeverageTokenMorphoMarketUrl } from "@router";

export const LinksAdditional: React.FC<{
  address?: Address;
}> = ({ address }) => {
  return (
    <div className="w-full flex text-bold1 flex-col gap-4 rounded-card bg-neutral-0 overflow-hidden p-4 py-6">
      <Typography type="bold1" className="ml-2">
        Additional Information
      </Typography>
      <div className="gap-3 flex flex-col md:flex-row">
        <div>
          <div className="bg-smallElements-lend p-2 px-4 rounded-tag">
            <ExternalLink url={getLeverageTokenMorphoMarketUrl(address)}>
              Underlying Morpho Lending Market
            </ExternalLink>
          </div>
        </div>
        <div>
          <div className="bg-smallElements-rewardAPY p-2 px-4 rounded-tag">
            <ExternalLink url="https://www.ether.fi/app/portfolio">Ether.fi Points</ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
};
