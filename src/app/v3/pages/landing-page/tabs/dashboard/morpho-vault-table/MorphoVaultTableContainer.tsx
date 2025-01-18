import { useAccount } from "wagmi";
import { useFetchUserVaultPositions } from "../../../../../../statev3/morpho/user-vault-positions/UserVaultPositions.hook";

export const MorphoVaultTableContainer = () => {
  const { address } = useAccount();

  const { data, ...rest } = useFetchUserVaultPositions(address);
  console.log({ data, rest });

  return <div>MorphoVaultTableContainer</div>;
};
