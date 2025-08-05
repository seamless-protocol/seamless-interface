import { Typography, DisplayMoney, FetchData, ExternalLink, StandardTooltip, FlexRow } from "@shared";
import { RewardItem } from "../../contexts/RewardsProvider";
import { useSumRewardDollarAmounts } from "../../hooks/SumRewardDollarAmounts";
import { useAccount } from "wagmi";

const morphoRewardsDocsUrl = "https://docs.morpho.org/rewards/getting-started#merkl-integration";
const morphoAppUrl = "https://app.morpho.org/";

export const RewardsHeading: React.FC<{
  items: FetchData<FetchData<RewardItem | undefined>[]>;
}> = ({ items }) => {
  const { address } = useAccount();
  const merklUserUrl = `https://app.merkl.xyz/users/${address}`;
  const dollarAmount = useSumRewardDollarAmounts(items.data?.map((i) => i?.data?.rewards).flat() || []);

  return (
    <div className="flex flex-col gap-2">
      <Typography type="regular5">Claim rewards</Typography>
      <FlexRow className="items-center gap-1">
        <Typography type="medium3">
          Looking for your Vault Rewards?{" "}
        </Typography>
        <ExternalLink url={merklUserUrl} className="text-primary-500">
          Merkl Claim
        </ExternalLink>
        <StandardTooltip>
          <FlexRow className="items-center gap-1">
            <Typography type="regular2">
              Morpho is now using Merkl platform to distribute rewards for Morpho Vaults. To claim rewards earned before Morpho's migration to Merkl, go to the{" "}
            </Typography>
            <ExternalLink url={morphoAppUrl} className="text-primary-500">Morpho App</ExternalLink>
            <Typography type="regular2">. See Morpho docs for more details{" "}</Typography>
            <ExternalLink url={morphoRewardsDocsUrl} className="text-primary-500">here</ExternalLink>
          </FlexRow>
        </StandardTooltip>
      </FlexRow>
      <DisplayMoney typography="bold6" {...items} {...dollarAmount} />
    </div>
  );
};
